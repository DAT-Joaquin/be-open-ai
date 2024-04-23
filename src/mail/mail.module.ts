import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
        // or
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: 'anhtuantb2422@gmail.com',
            pass: 'kjub nrxz rynd yjcx',
          },
          tls: {
            rejectUnauthorized: false, // do not fail on invalid certs
          },
          // auth: {
          //   user: 'anhtuantb2422@gmail.com',
          //   pass: 'cxxlbxgqdfjrttqh',
          // },
        },
        defaults: {
          from: 'Beta Cinemas <noreply@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
