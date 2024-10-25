import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout, WorkoutSchema } from 'src/mongoose/entities/Workout';
import { Comment, CommentSchema } from 'src/mongoose/entities/Comment';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Workout.name, schema: WorkoutSchema },
			{ name: Comment.name, schema: CommentSchema },
		]),
	],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
