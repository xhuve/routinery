import { Module } from '@nestjs/common';
import { User, UserSchema } from '../mongoose/entities/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModule } from 'src/workout/workout.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
