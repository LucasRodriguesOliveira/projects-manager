import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './config/env/env.config';
import { ProjectModule } from './modules/project/project.module';
import { TypeOrmPostgreSQLModule } from './modules/typeorm/typeorm.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmPostgreSQLModule,
    UserModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
