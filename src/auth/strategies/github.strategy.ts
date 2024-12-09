// src/auth/strategies/github.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: config.get('github.clientId'),
      clientSecret: config.get('github.clientSecret'),
      callbackURL: config.get('github.callbackURL'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, emails } = profile;
    const email = emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { githubId: id.toString() },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          githubId: id.toString(),
        },
      });
    }

    return user;
  }
}