import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";


@Entity({ name: 'exercise' })
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string

    @Column({ default: "None" })
    type: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ nullable: true })
    length: number

    @ManyToMany(() => Workout, (workout) => workout.exercises)
    workouts: Workout[]
}