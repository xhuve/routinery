import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
    constructor(private workoutService: WorkoutService) {}

    @Get()
    getWorkouts() {
        return this.workoutService.getWorkouts()
    }

    @Post()
    createWorkout(@Body() CreateWorkoutDto: CreateWorkoutDto) {
        return this.workoutService.createWorkout(CreateWorkoutDto)
    }
}
