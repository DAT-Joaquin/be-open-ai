import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { OAuth2Service } from '../services/oauth2.service';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacebookOAuthGuard } from '../guard/facebook-oauth.guard';

@ApiTags('Facebook')
@Controller({
  path: 'facebook',
  version: '1',
})
export class FacebookController {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Get()
  // @UseGuards(AuthGuard('google'))
  @UseGuards(FacebookOAuthGuard)
  async facebookAuth() {}

  @ApiOperation({
    summary: 'Đăng nhập bằng facebook',
  })
  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(FacebookOAuthGuard)
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.oauth2Service.facebookLogin(req, res);
  }
}
