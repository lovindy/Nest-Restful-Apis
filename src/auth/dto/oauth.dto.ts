// src/auth/dto/oauth.dto.ts
import { IsString } from 'class-validator';

export class OAuthUserDto {
  @IsString()
  id: string;

  @IsString()
  email: string;
}

export class OAuthTokenDto {
  @IsString()
  access_token: string;

  @IsString()
  token_type: string;
}

export class GithubCallbackDto {
  @IsString()
  code: string;

  @IsString()
  state?: string;
}

export class GithubEmailResponseDto {
  @IsString()
  email: string;

  @IsString()
  primary: boolean;

  @IsString()
  verified: boolean;

  @IsString()
  visibility: string;
}

export class GithubUserResponseDto {
  @IsString()
  id: string;

  @IsString()
  login: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  avatar_url: string;
}