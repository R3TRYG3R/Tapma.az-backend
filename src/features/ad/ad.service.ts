import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from '@/entities/ad.entity';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { GetAdsQueryDto } from './dto/get-ad-query.dto';
import { User } from '@/entities/user.entity';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepo: Repository<Ad>,
  ) {}

  async findAll(): Promise<Ad[]> {
    return this.adRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Ad> {
    const ad = await this.adRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!ad) throw new NotFoundException('Ad not found');
    return ad;
  }

  async create(userId: number, dto: CreateAdDto): Promise<Ad> {
    const count = await this.adRepo.count({
      where: { user: { id: userId } },
    });

    if (count >= 5) {
      throw new BadRequestException('Maximum 5 ads per user');
    }

    const user = await this.adRepo.manager.findOne(User, {
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ad = this.adRepo.create({
      ...dto,
      user,
    });

    return this.adRepo.save(ad);
  }

  async update(id: number, dto: UpdateAdDto, currentUser: any): Promise<Ad> {
    const ad = await this.findById(id);

    if (!ad.user) {
      throw new ForbiddenException('This ad has no owner');
    }

    if (String(ad.user.id) !== String(currentUser.id) && currentUser.role !== 'admin') {
      throw new ForbiddenException('You can only update/delete your own ads');
    }

    Object.assign(ad, dto);
    return this.adRepo.save(ad);
  }

  async delete(id: number, currentUser: any): Promise<void> {
    const ad = await this.findById(id);

    if (!ad.user) {
      throw new ForbiddenException('This ad has no owner');
    }

    if (String(ad.user.id) !== String(currentUser.id) && currentUser.role !== 'admin') {
      throw new ForbiddenException('You can only update/delete your own ads');
    }

    await this.tryDeleteFileByUrl(ad.imageUrl);
    await this.adRepo.remove(ad);
  }

  async updateImage(id: number, file: Express.Multer.File, currentUser: any): Promise<Ad> {
    const ad = await this.findById(id);

    if (!ad.user) {
      await this.tryDeleteFile(file.filename);
      throw new ForbiddenException('This ad has no owner');
    }

    if (String(ad.user.id) !== String(currentUser.id) && currentUser.role !== 'admin') {
      await this.tryDeleteFile(file.filename);
      throw new ForbiddenException('You can only update/delete your own ads');
    }

    await this.tryDeleteFileByUrl(ad.imageUrl);

    ad.imageUrl = `http://localhost:3000/uploads/${file.filename}`;
    return this.adRepo.save(ad);
  }

  async findFiltered(query: GetAdsQueryDto): Promise<Ad[]> {
  const qb = this.adRepo.createQueryBuilder('ad')
    .leftJoinAndSelect('ad.user', 'user')
    .orderBy('ad.createdAt', 'DESC');

  if (query.search) {
    qb.andWhere('LOWER(ad.title) LIKE LOWER(:search)', {
      search: `%${query.search}%`,
    });
  }

  return qb.getMany();
}

  private async tryDeleteFile(filename: string) {
    const filePath = join(__dirname, '..', '..', '..', 'uploads', filename);
    try {
      await unlink(filePath);
    } catch (err) {
      console.warn(`⚠️ Failed to delete file: ${filePath}`, err.message);
    }
  }

  private async tryDeleteFileByUrl(fileUrl?: string) {
    if (!fileUrl?.startsWith('http://localhost:3000/uploads/')) return;
    const filename = fileUrl.split('/uploads/')[1];
    await this.tryDeleteFile(filename);
  }
}