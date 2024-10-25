import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Comment } from 'src/mongoose/entities/Comment';
import { Workout } from 'src/mongoose/entities/Workout';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
	) {}

	async getAllComments() {
		return await this.commentModel.find();
	}

	async getWorkoutComments(id: number) {
		const workout = await this.workoutModel.findOne({
			where: { id },
			relations: ['comments'],
		});
		if (!workout)
			throw new HttpException('Workout not found.', HttpStatus.BAD_REQUEST);

		return workout.comments;
	}

	async addWorkoutComment(
		workoutId: number,
		workoutComment: {
			content: string;
			author: string;
		},
	) {
		const workout = await this.workoutModel.findOne({
			where: { id: workoutId },
			relations: ['comments'],
		});
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

	async deleteComment(id: number) {
		this.commentModel.deleteOne({ id });
	}
}
