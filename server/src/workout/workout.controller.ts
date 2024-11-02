import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtPasswordStrategy } from 'src/auth/guards/passport-jwt.guard';
import { Request } from 'express';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get()
	@UseGuards(JwtPasswordStrategy)
	@ApiQuery({ name: 'pageNumber', required: false })
	@ApiQuery({ name: 'type', required: false })
	async getWorkouts(
		@Req() request: Request,
		@Query('pageNumber', new DefaultValuePipe(0), ParseIntPipe)
		pageNumber: number,
	) {
		try {
			const { userId } = request.user as { userId: string };
			return await this.workoutService.getWorkouts(pageNumber, userId);
		} catch (error) {
			console.log(error);
		}
	}

	@Get(':workoutId')
	async getWorkoutById(@Param('workoutId', ParseIntPipe) workoutId: number) {
		return await this.workoutService.getWorkoutById(workoutId);
	}

	@Post()
	async createWorkout(@Body() CreateWorkoutDto: CreateWorkoutDto) {
		return await this.workoutService.createWorkout(CreateWorkoutDto);
	}

	@Delete(':workoutId')
	async deleteWorkout(@Param('workoutId') id: string) {
		await this.workoutService.deleteWorkout(id);
	}
}
