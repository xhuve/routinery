import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	gender: string;

	@Column()
	profilePicture: string;

	@CreateDateColumn()
	createdAt: Date;
}
