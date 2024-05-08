import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { OAuth2Service } from '../services/oauth2.service';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from '../guard/google-oauth.guard';

@ApiTags('Google')
@Controller({
  path: 'google',
  version: '1',
})
export class GoogleController {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Get()
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @ApiOperation({
    summary: 'Đăng nhập bằng google',
  })
  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.oauth2Service.googleLogin(req, res);
  }
}
