import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dtos/CreateExerciseDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Get()
    getExercise() {
        return this.exerciseService.getExercises()
    }

    @Post()
    createExercise(@Body() createExercise: CreateExerciseDto) {
        this.exerciseService.createExercise(createExercise)
    }
}
