import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
