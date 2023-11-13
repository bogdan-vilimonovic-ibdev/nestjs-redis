import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppService } from './app.service';


@Module({
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true,
    }),  
    CacheModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      store: await redisStore({
        url: configService.get('REDIS_URL'),
      }),
    }),
    isGlobal: true,
    inject: [ConfigService],
  }),],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
