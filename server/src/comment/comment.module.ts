import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { Comment } from 'src/typeorm/entities/Comment';
import { CommentService } from './comment.service';

@Module({
	imports: [TypeOrmModule.forFeature([Workout, Comment])],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
