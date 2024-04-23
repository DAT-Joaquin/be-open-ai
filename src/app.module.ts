import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChairModule } from './chair/chair.module';
import configuration from './configs';
import { FilmModule } from './film/film.module';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { RawBodyMiddleware } from './middlewares/raw-body.middleware';
import { S3Module } from './s3/s3.module';
import { StoreModule } from './store/store.module';
import { StripeModule } from './stripe/stripe.module';
import { UserModule } from './user/user.module';
import { OpenaiModule } from './openai/openai.module';
import { ChatCompletionModule } from './chat-completion/chat-completion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule.register({
      timeout: 10000,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    S3Module,
    AuthModule,
    UserModule,
    StoreModule,
    StripeModule,
    FilmModule,
    ChairModule,
    OpenaiModule,
    ChatCompletionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes({
      path: 'stripe/webhooks',
      method: RequestMethod.POST,
    });

    consumer
      .apply(JsonBodyMiddleware)
      .exclude('stripe/webhooks')
      .forRoutes('*');
  }
}
