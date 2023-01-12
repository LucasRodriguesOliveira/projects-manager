import { Project } from '../entitites/project.entity';

export class UpdateProjectDto {
  title: string;
  zipCode: string;
  cost: number;
  deadline: Date;
}

export interface UpdateProjectResponseDto {
  title: string;
  zipCode: string;
  cost: number;
  deadline: Date;
  updatedAt: Date;
}

export class UpdateProjectResponse {
  static from({
    cost,
    deadline,
    updatedAt,
    zipCode,
    title,
  }: Project): UpdateProjectResponseDto {
    return {
      cost,
      title,
      zipCode,
      deadline,
      updatedAt,
    };
  }
}

export class ChangeStatusDto {
  isDone: boolean;
}
