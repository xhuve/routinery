import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
}