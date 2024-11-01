import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { UsersModule } from './users/users.module';
import { Exercise, ExerciseSchema } from './mongoose/entities/Exercise';
import { ExerciseModule } from './exercise/exercise.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSeeder } from './seeder/exercise.seeder';

@Module({
	imports: [
		WorkoutModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		MongooseModule.forFeature([
			{ name: Exercise.name, schema: ExerciseSchema },
		]),
		UsersModule,
		ExerciseModule,
		CommentModule,
		AuthModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	controllers: [AppController],
	providers: [AppService, ExerciseSeeder],
})
export class AppModule {
	constructor(private readonly exerciseSeeder: ExerciseSeeder) {}

	async onModuleInit() {
		await this.exerciseSeeder.removeExercises();
		await this.exerciseSeeder.seedExercises();
	}
}
