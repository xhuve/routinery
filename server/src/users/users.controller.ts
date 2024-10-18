import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { ApiTags } from '@nestjs/swagger';
import { JwtPasswordStrategy } from 'src/auth/guards/passport-jwt.guard';

@ApiTags('user')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@UseGuards(JwtPasswordStrategy)
	@Get(':userId')
	async getUserById(@Param('userId', ParseIntPipe) id: number) {
		return await this.userService.getUserById(id);
	}

	@Get()
	async getUsers() {
		return await this.userService.getUsers();
	}

	@Put(':id')
	async updateUserById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		await this.userService.updateUser(id, updateUserDto);
	}

	@UseGuards(JwtPasswordStrategy)
	@Delete(':id')
	async deleteByUserId(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id);
	}
}
