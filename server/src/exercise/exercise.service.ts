import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Exercise } from 'src/mongoose/entities/Exercise';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
	constructor(
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
	) {}

	getExercises() {
		return this.exerciseModel.find();
	}

	createExercise(newExercise: { name: string; type: string; length: number }) {
		const exercise = new this.exerciseModel({ ...newExercise });
		return exercise.save();
	}

	deleteExercise(id: number): Promise<{}> {
		return this.exerciseModel.deleteOne({ id });
	}
}
