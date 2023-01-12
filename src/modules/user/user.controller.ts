import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  public async login(
    @Body() { password, username }: LoginDto,
  ): Promise<string> {
    console.log(username);
    console.log(password);
    return this.userService.login(username, password);
  }
}
