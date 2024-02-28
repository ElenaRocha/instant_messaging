import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: any = [{ id: 0, name: 'Elena' }];

  findAll() {
    return this.users;
  }

  findById(userId: number) {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), name: createUserDto.name };
    this.users.push(newUser);
    return newUser;
  }
}
