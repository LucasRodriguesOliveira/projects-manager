import { ConfigModuleOptions } from '@nestjs/config';
import { envSchema } from '../schema/env.schema';
import { appLoadEnv } from './app.config';
import { typeOrmLoadEnv } from './typeorm.config';

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [appLoadEnv, typeOrmLoadEnv],
  validationSchema: envSchema,
};
