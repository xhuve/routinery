import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './Workout';

@Entity({ name: 'comment' })
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column()
	author: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => Workout, (workout) => workout.comments)
	workout: Workout;
}
