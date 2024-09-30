import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { Repository } from 'typeorm';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';

@Injectable()
export class WorkoutService {
    constructor(@InjectRepository(Workout) private workoutRepo: Repository<Workout>) {}

    getWorkouts() {
        return this.workoutRepo.find()
    }

    createWorkout(createWorkoutDto: { 
        name: string; 
        length: number;
    }) {
        const workout = this.workoutRepo.create({
            ...createWorkoutDto
        });
        return this.workoutRepo.save(workout);
    }
}
