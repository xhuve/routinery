import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getUsers() {
    return this.userRepo.find();
  }

  createUser(userDetails: {
    username: string;
    password: string;
    email: string;
  }) {
    const newUser = this.userRepo.create({ ...userDetails });

    return this.userRepo.save(newUser);
  }

  updateUser(
    userId: number,
    userDetails: { username: string; password: string; email: string },
  ) {
    return this.userRepo.update(userId, { ...userDetails });
  }

  async deleteUser(id: number) {
    await this.userRepo.delete({ id });
  }
}
