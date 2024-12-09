// src/bookmarks/dto/bookmark.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
