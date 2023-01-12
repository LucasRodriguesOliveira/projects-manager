import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entitites/project.entity';
import { LocationService } from './location.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), HttpModule],
  providers: [ProjectService, LocationService],
  controllers: [ProjectController],
})
export class ProjectModule {}
