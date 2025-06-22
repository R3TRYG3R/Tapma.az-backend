import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('ads')
export class Ad {
  @ApiProperty({ example: 1, description: 'Unique ID of the ad' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'iPhone 13 for sale', description: 'Title of the ad' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Brand new iPhone 13 with box and receipt.', description: 'Detailed description' })
  @Column()
  description: string;

  @ApiProperty({
    example: 'http://localhost:3000/uploads/ad-1710000000000-123456789.webp',
    required: false,
  })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiProperty({ type: () => User, description: 'Owner of the ad' })
  @ManyToOne(() => User, (user) => user.ads, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}