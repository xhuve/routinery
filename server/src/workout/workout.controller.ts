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

	@UseGuards(JwtPasswordStrategy)
	@Get()
	async getAllWorkouts(
		@Query('pageNumber', new DefaultValuePipe(0), ParseIntPipe)
		pageNumber: number,
	) {
		const workouts = await this.workoutService.getAllWorkouts(pageNumber);
		console.log(workouts);

		return workouts;
	}

	@Get('user')
	@UseGuards(JwtPasswordStrategy)
	@ApiQuery({ name: 'pageNumber', required: false })
	async getUserWorkouts(
		@Req() request: Request,
		@Query('pageNumber', new DefaultValuePipe(0), ParseIntPipe)
		pageNumber: number,
	) {
		try {
			const { userId } = request.user as { userId: string };
			const workouts = await this.workoutService.getUserWorkouts(
				pageNumber,
				userId,
			);

			console.log(workouts);

			return workouts;
		} catch (error) {
			console.log(error);
		}
	}

	@Get(':workoutId')
	async getWorkoutById(@Param('workoutId') workoutId: string) {
		return await this.workoutService.getWorkoutsById([workoutId]);
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
