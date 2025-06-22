import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ad } from '@/entities/ad.entity';
import { AdsService } from '../ad/ad.service';
import { AdsController } from '../ad/ad.controller';
import { User } from '@/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ad, User])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}