import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dtos/CreateCommentDto';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get()
	getWorkouts() {
		return this.workoutService.getWorkouts();
	}

	@Post()
	createWorkout(@Body() CreateWorkoutDto: CreateWorkoutDto) {
		return this.workoutService.createWorkout(CreateWorkoutDto);
	}

	@Get(':id/comment')
	getWorkoutComments(@Param('id', ParseIntPipe) id: number) {
		return this.workoutService.getWorkoutComments(id);
	}
	@Post(':id/comment')
	addWorkoutComment(
		@Param('id', ParseIntPipe) id: number,
		@Body() addCommentDto: CreateCommentDto,
	) {
		console.log(id);
		return this.workoutService.addWorkoutComment(id, addCommentDto);
	}
}
