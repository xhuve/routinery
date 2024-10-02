import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Comment } from './Comment';

@Entity({ name: 'workout' })
export class Workout {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	length: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToMany(() => Exercise, (exercise) => exercise.workouts)
	@JoinTable()
	exercises: Exercise[];

	@OneToMany(() => Comment, (comment) => comment.workout)
	comments: Comment[];
}
