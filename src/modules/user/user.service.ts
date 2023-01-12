import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse, UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async register(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const userExist = await this.checkUsernameExists(createUserDto.username);

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.save(createUserDto);

    return UserResponse.from(user);
  }

  private async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      username,
    });

    return !!user;
  }

  public async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!this.checkPassword(password, user)) {
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
    }

    return user.id;
  }

  private checkPassword(password: string, user: User): boolean {
    return password === user.password;
  }
}
