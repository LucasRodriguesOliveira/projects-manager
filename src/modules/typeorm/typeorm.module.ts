import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from 'src/config/typeorm/typeorm.config';
import { Project } from '../project/entitites/project.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleConfig([User, Project]))],
})
export class TypeOrmPostgreSQLModule {}
