import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @Get()
    async getUsers() {
        return await this.userService.getUsers()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteByUserId(@Param('id', ParseIntPipe) id: number) {
        await this.userService.deleteUser(id)
    }
}
