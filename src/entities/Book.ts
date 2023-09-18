import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: true })
  available: boolean;

  @Column({ nullable: true })
  borrowedBy?: string;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  endDate?: Date;
}
