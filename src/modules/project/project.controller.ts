import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindProjectResponseDto } from './dto/project-response.dto';
import {
  ChangeStatusDto,
  UpdateProjectDto,
  UpdateProjectResponseDto,
} from './dto/update-project.dto';
import { Project } from './entitites/project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public async create(
    @Body() createProjectDto: CreateProjectDto,
    @Headers('userId') userId: string,
  ) {
    return this.projectService.create(createProjectDto, userId);
  }

  @Get()
  public async list(@Headers('userId') userId: string): Promise<Project[]> {
    return this.projectService.list(userId);
  }

  @Get(':projectId')
  public async find(
    @Param('projectId') projectId: string,
    @Headers('userId') userId: string,
  ): Promise<FindProjectResponseDto> {
    return this.projectService.find(userId, projectId);
  }

  @Put(':projectId')
  public async update(
    @Param('projectId') projectId: string,
    @Headers('userId') userId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectResponseDto> {
    return this.projectService.update(userId, projectId, updateProjectDto);
  }

  @Patch(':projectId')
  public async changeStatus(
    @Param('projectId') projectId: string,
    @Headers('userId') userId: string,
    @Body() { isDone }: ChangeStatusDto,
  ): Promise<UpdateProjectResponseDto> {
    return this.projectService.changeStatus(userId, projectId, isDone);
  }

  @Delete(':projectId')
  public async remove(
    @Param('projectId') projectId: string,
    @Headers('userId') userId: string,
  ): Promise<boolean> {
    return this.projectService.remove(userId, projectId);
  }
}
