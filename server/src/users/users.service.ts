import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

	getUsers() {
		return this.userRepo.find();
	}

	getUserById(id: number) {
		return this.userRepo.findBy({ id });
	}

	getUserByUsername(username: string) {
		return this.userRepo.findOneBy({ username });
	}

	createUser(userDetails: {
		username: string;
		password: string;
		email: string;
		gender: string;
	}) {
		const newUser = this.userRepo.create({
			...userDetails,
			profilePicture: `https://avatar.iran.liara.run/public/boy?username=${userDetails.username}`,
		});

		return this.userRepo.save(newUser);
	}

	updateUser(
		userId: number,
		userDetails: { username: string; password: string; email: string },
	) {
		return this.userRepo.update(userId, { ...userDetails });
	}

	async deleteUser(id: number) {
		await this.userRepo.delete({ id });
	}
}
