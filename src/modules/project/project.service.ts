import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entitites/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import {
  CreateProjectResponse,
  CreateProjectResponseDto,
  FindProjectResponse,
} from './dto/project-response.dto';
import { LocationService } from './location.service';
import { Location, FindProjectResponseDto } from './dto/project-response.dto';
import {
  UpdateProjectResponse,
  UpdateProjectDto,
  UpdateProjectResponseDto,
} from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly locationService: LocationService,
  ) {}

  public async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<CreateProjectResponseDto> {
    const project: Project = await this.projectRepository.save({
      ...createProjectDto,
      userId,
    });

    return CreateProjectResponse.from(project);
  }

  public async list(userId: string): Promise<Project[]> {
    if (!userId) {
      throw new HttpException('A user must be specified', HttpStatus.NOT_FOUND);
    }

    const projects = await this.projectRepository.findBy({ userId });

    if (!projects.length) {
      throw new HttpException('No projects found!', HttpStatus.NOT_FOUND);
    }

    return projects;
  }

  public async find(
    userId: string,
    projectId: string,
  ): Promise<FindProjectResponseDto> {
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) {
      throw new HttpException('Project Not Found', HttpStatus.NOT_FOUND);
    }

    if (project.userId !== userId) {
      throw new HttpException(
        'User does not have authorization to retrieve this project data',
        HttpStatus.FORBIDDEN,
      );
    }

    const projectLocation: Location = await this.locationService.findByZipCode(
      project.zipCode,
    );

    return FindProjectResponse.from(project, projectLocation);
  }

  public async update(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectResponseDto> {
    const projectExists = await this.projectRepository.findOneBy({
      id: projectId,
    });

    if (!projectExists) {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }

    if (projectExists.userId !== userId) {
      throw new HttpException('Not authorized!', HttpStatus.FORBIDDEN);
    }

    await this.projectRepository.update(
      { id: projectId },
      { ...updateProjectDto },
    );

    const project = await this.projectRepository.findOneBy({ id: projectId });

    return UpdateProjectResponse.from(project);
  }

  public async changeStatus(
    userId: string,
    projectId: string,
    isDone: boolean,
  ): Promise<UpdateProjectResponseDto> {
    const projectExists = await this.projectRepository.findOneBy({
      id: projectId,
    });

    if (!projectExists) {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }

    if (projectExists.userId !== userId) {
      throw new HttpException('Not authorized!', HttpStatus.FORBIDDEN);
    }

    await this.projectRepository.update({ id: projectId }, { done: isDone });

    const project = await this.projectRepository.findOneBy({ id: projectId });

    return UpdateProjectResponse.from(project);
  }

  public async remove(userId: string, projectId: string): Promise<boolean> {
    const projectExists = await this.projectRepository.findOneBy({
      id: projectId,
    });

    if (!projectExists) {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }

    if (projectExists.userId !== userId) {
      throw new HttpException('Not authorized!', HttpStatus.FORBIDDEN);
    }

    const { affected } = await this.projectRepository.delete({ id: projectId });

    return affected > 0;
  }
}
