import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager'
import { json } from 'stream/consumers';


@Injectable()
export class AppService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async getHello()
    {
        const cachedData = await this.cacheManager.get('data');
        if(cachedData != null)
        {
            return cachedData;
        }

        const data = (await axios.get('https://jsonplaceholder.typicode.com/photos')).data;

        await this.cacheManager.set('data', data);

        return data;
    }
}
