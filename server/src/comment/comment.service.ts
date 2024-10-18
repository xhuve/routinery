import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';
import { Workout } from 'src/typeorm/entities/Workout';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment) private commentRepo: Repository<Comment>,
		@InjectRepository(Workout) private workoutRepo: Repository<Workout>,
	) {}

	async getAllComments() {
		return await this.commentRepo.find();
	}

	async getWorkoutComments(id: number) {
		const workout = await this.workoutRepo.findOne({
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
		const workout = await this.workoutRepo.findOne({
			where: { id: workoutId },
			relations: ['comments'],
		});
		if (!workout) {
			throw new HttpException(
				'Workout not found, cannot add comment.',
				HttpStatus.BAD_REQUEST,
			);
		}
		const comment = this.commentRepo.create({
			...workoutComment,
			workout: workout,
		});
		const savedComment = await this.commentRepo.save(comment);

		workout.comments = workout.comments || [];
		workout.comments.push(savedComment);

		return await this.commentRepo.save(workout);
	}

	async deleteComment(id: number) {
		this.commentRepo.delete({ id });
	}
}
