import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from 'src/mongoose/entities/Exercise';

@Injectable()
export class ExerciseService {
	constructor(
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
	) {}

	async getExercises(pageNumber: number, exerciseType: string) {
		const pageLimit: number = parseInt(process.env.PAGINATION_LIMIT);

		const paginationExercises = this.exerciseModel
			.find()
			.limit(pageLimit)
			.skip(pageLimit * pageNumber);

		if (exerciseType && exerciseType != 'All')
			return {
				exercises: await paginationExercises.find({
					type: exerciseType,
				}),
				totalItems: await this.exerciseModel.countDocuments({
					type: exerciseType,
				}),
			};

		return {
			exercises: await paginationExercises.find({}),
			totalItems: await this.exerciseModel.countDocuments(),
		};
	}

	createExercise(newExercise: { name: string; type: string; length: number }) {
		const exercise = new this.exerciseModel({ ...newExercise });
		return exercise.save();
	}

	deleteExercise(id: number): Promise<{}> {
		return this.exerciseModel.deleteOne({ id });
	}
}
