import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/mongoose/entities/Comment';
import { Workout } from 'src/mongoose/entities/Workout';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
	) {}

	async getAllComments() {
		return await this.commentModel.find();
	}

	async getWorkoutComments(id: string) {
		const workout = await this.workoutModel.findById(id).populate('comments');

		if (!workout)
			throw new HttpException('Workout not found.', HttpStatus.BAD_REQUEST);

		return workout.comments;
	}

	async addWorkoutComment(
		workoutId: string,
		workoutComment: {
			content: string;
			author: string;
		},
	) {
		const workout = await this.workoutModel
			.findById({
				id: workoutId,
			})
			.populate(['comments']);
		if (!workout) {
			throw new HttpException(
				'Workout not found, cannot add comment.',
				HttpStatus.BAD_REQUEST,
			);
		}
		const comment = new this.commentModel({
			...workoutComment,
			workout: workout,
		});
		const savedComment = await comment.save();

		workout.comments = workout.comments || [];
		workout.comments.push(savedComment._id);

		return await workout.save();
	}

	async deleteComment(id: string) {
		this.commentModel.deleteOne({ id });
	}
}
