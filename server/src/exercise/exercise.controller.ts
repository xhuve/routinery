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
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dtos/CreateExerciseDto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
	constructor(private exerciseService: ExerciseService) {}

	@Get()
	@ApiTags()
	@ApiQuery({ name: 'pageNumber', required: false })
	@ApiQuery({ name: 'type', required: false })
	async getExercise(
		@Query('pageNumber', new DefaultValuePipe(0), ParseIntPipe)
		pageNumber: number,
		@Query('type', new DefaultValuePipe('')) exerciseType: string,
	) {
		try {
			const { exercises, totalItems } = await this.exerciseService.getExercises(
				pageNumber,
				exerciseType,
			);
			return { exercises, totalItems };
		} catch (error) {
			console.log(error);
		}
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
