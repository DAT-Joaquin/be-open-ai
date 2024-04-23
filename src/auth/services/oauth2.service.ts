import { Injectable } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class OAuth2Service {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  async googleLogin(req: any, res: any) {
    const queryFromClient: any = JSON.parse(req.query.state);
    const { redirect_url } = queryFromClient;
    if (!req.user) {
      // return res.redirect(redirect_url + '?error_message=No_has_user');
      return res.status(400).json({ error: 'No user from google' });
    }

    if (!redirect_url) {
      return res.status(400).json({ error: 'Missing redirect url!' });
    }

    const data: any = await this.userService.loginWithOauth2(req.user);

    this.mailService.sendMail({
      to: data.email,
      subject: 'Thông tin tài khoản đăng nhập từ hệ thống Beta Cinemas',
      template: './notify-account',
      context: {
        email: data.email,
        password: data.password,
      },
    });

    res.redirect(
      redirect_url +
        '?token=' +
        data.accessToken +
        '&refresh_token=' +
        data.refreshToken,
    );
  }

  async facebookLogin(req: any, res: any) {
    const queryFromClient: any = JSON.parse(req.query.state);
    const { redirect_url } = queryFromClient;
    if (!req.user?.user) {
      // return res.redirect(redirect_url + '?error_message=No_has_user');
      return res.status(400).json({ error: 'No user from facebook' });
    }

    if (!redirect_url) {
      return res.status(400).json({ error: 'Missing redirect url!' });
    }

    const data: any = await this.userService.loginWithOauth2(req.user?.user);

    this.mailService.sendMail({
      to: data.email,
      subject: 'Thông tin tài khoản đăng nhập từ hệ thống Beta Cinemas',
      template: './notify-account',
      context: {
        email: data.email,
        password: data.password,
      },
    });

    res.redirect(
      redirect_url +
        '?token=' +
        data.accessToken +
        '&refresh_token=' +
        data.refreshToken,
    );
  }
}
