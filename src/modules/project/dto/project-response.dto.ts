import { Project } from '../entitites/project.entity';

export interface CreateProjectResponseDto {
  id: string;
  title: string;
  deadline: Date;
  cost: number;
}

export class CreateProjectResponse {
  static from({
    id,
    title,
    deadline,
    cost,
  }: Project): CreateProjectResponseDto {
    return {
      id,
      title,
      deadline,
      cost,
    };
  }
}

export interface Location {
  city: string;
  state: string;
}

export interface FindProjectResponseDto {
  id: string;
  title: string;
  deadline: Date;
  cost: number;
  done: boolean;
  createdAt: Date;
  zipCode: string;
  location: Location;
}

export class FindProjectResponse {
  static from(
    { cost, createdAt, deadline, done, id, title, zipCode }: Project,
    location: Location,
  ): FindProjectResponseDto {
    return {
      cost,
      createdAt,
      deadline,
      done,
      id,
      location,
      title,
      zipCode,
    };
  }
}
