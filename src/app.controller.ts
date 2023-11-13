import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getHello()
    {
        return this.appService.getHello();
    }
}
