import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../env/typeorm.config';

export const typeOrmModuleConfig = (entities): TypeOrmModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const {
      host = '',
      port = 5432,
      username = '',
      password = '',
      database = '',
    } = configService.get<TypeOrmConfig>('database');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
      entities,
    };
  },
});
