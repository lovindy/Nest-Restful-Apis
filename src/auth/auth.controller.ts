// src/auth/auth.controller.ts
import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Res,
    Req,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignUpDto, SignInDto } from './dto/auth.dto';
  import { GithubAuthGuard } from './guards/oauth.guard';
  import { Public } from './decorators/public.decorator';
  import { Response } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('signup')
    async signUp(
      @Body() dto: SignUpDto,
      @Res({ passthrough: true }) res: Response,
    ) {
      const { access_token } = await this.authService.signUp(dto);
      res.cookie('jwt', access_token, { httpOnly: true });
      return { message: 'Signed up successfully' };
    }
  
    @Public()
    @Post('signin')
    async signIn(
      @Body() dto: SignInDto,
      @Res({ passthrough: true }) res: Response,
    ) {
      const { access_token } = await this.authService.signIn(dto);
      res.cookie('jwt', access_token, { httpOnly: true });
      return { message: 'Signed in successfully' };
    }
  
    @Public()
    @Get('github')
    @UseGuards(GithubAuthGuard)
    githubAuth() {}
  
    @Public()
    @Get('github/callback')
    @UseGuards(GithubAuthGuard)
    async githubAuthCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
      const { access_token } = await this.authService.signToken(
        req.user.id,
        req.user.email,
      );
      res.cookie('jwt', access_token, { httpOnly: true });
      res.redirect('/'); // Redirect to frontend
    }
  
    @Post('signout')
    signOut(@Res({ passthrough: true }) res: Response) {
      res.clearCookie('jwt');
      return { message: 'Signed out successfully' };
    }
  }