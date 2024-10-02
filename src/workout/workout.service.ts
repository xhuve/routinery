import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { In, Repository } from 'typeorm';
import { CreateWorkoutDto } from './dtos/CreateWorkoutDto';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { Comment } from 'src/typeorm/entities/Comment';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectRepository(Workout) private workoutRepo: Repository<Workout>,
		@InjectRepository(Exercise) private exerciseRepo: Repository<Exercise>,
		@InjectRepository(Comment) private commentRepo: Repository<Comment>,
	) {}

	async getWorkouts() {
		return await this.workoutRepo.find({
			relations: {
				exercises: true,
			},
		});
	}

	async createWorkout(newWorkout: CreateWorkoutDto) {
		const exercises = await this.exerciseRepo.findBy({
			id: In(newWorkout.exercises || []),
		});
		const comments = await this.commentRepo.findBy({
			id: In(newWorkout.comments || []),
		});

		const workout = this.workoutRepo.create({
			...newWorkout,
			exercises,
			comments,
		});
		return await this.workoutRepo.save(workout);
	}

	async getWorkoutComments(id: number) {
		return await this.commentRepo.find({ where: { workout: { id } } });
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

		return await this.workoutRepo.save(workout);
	}
}
