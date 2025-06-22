import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Ad } from '@/entities/ad.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'Unique ID of the user' })
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  @Expose()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashed_password', description: 'Hashed user password' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: 'JohnDoe' })
  @Expose()
  @Column()
  nickname: string;

  @ApiProperty({ example: 'https://img.com/avatar.png', required: false })
  @Expose()
  @Column({ nullable: true })
  avatarUrl?: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  @Expose()
  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @ApiProperty()
  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Ad, (ad) => ad.user, { cascade: true })
  ads: Ad[];
}