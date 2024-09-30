import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
    constructor( @InjectRepository(Exercise) private exerciseRepo: Repository<Exercise> ) {}

    getExercises() {
        return this.exerciseRepo.find()
    }

    createExercise(createExercise: {
        name: string;
        type: string;
        length: number;
    }) {
        const exercise = this.exerciseRepo.create({...createExercise});
        this.exerciseRepo.save(exercise);
    }

}
