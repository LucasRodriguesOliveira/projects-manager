import { User } from '../entities/user.entity';

export interface UserResponseDto {
  id: string;
  username: string;
}

export class UserResponse {
  static from({ id, username }: User): UserResponseDto {
    return {
      id,
      username,
    };
  }
}
