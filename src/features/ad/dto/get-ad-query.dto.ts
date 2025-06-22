import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAdsQueryDto {
  @ApiPropertyOptional({ description: 'Search in ad title' })
  @IsOptional()
  @IsString()
  search?: string;
}