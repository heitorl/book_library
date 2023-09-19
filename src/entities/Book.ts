import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: "text", default: "", nullable: true })
  description?: string;

  @Column({ default: true })
  available: boolean;

  @Column({ nullable: true })
  borrowedBy?: string;

  @Column({ nullable: true, type: "date" })
  startDate?: Date | null;

  @Column({ nullable: true, type: "date" })
  endDate?: Date | null;
}
