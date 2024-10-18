import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dtos/CreateExerciseDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
	constructor(private exerciseService: ExerciseService) {}

	@Get()
	async getExercise() {
		return await this.exerciseService.getExercises();
	}

	@Post()
	createExercise(@Body() createExercise: CreateExerciseDto) {
		return this.exerciseService.createExercise(createExercise);
	}

	@Delete(':exerciseId')
	async deleteExercise(@Param('exerciseId', ParseIntPipe) id: number) {
		await this.exerciseService.deleteExercise(id);
	}
}
