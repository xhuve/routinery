import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get()
	async getWorkouts() {
		return await this.workoutService.getWorkouts();
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
	async deleteWorkout(@Param('workoutId', ParseIntPipe) id: number) {
		await this.workoutService.deleteWorkout(id);
	}
}
