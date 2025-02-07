import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { nullable: true })
  price: number;

  @Column()
  address: string;

  // Using a simple comma-separated string (or a JSON array) for images.
  @Column('simple-array', { nullable: true })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Associate the listing with a user (Admin) who created it.
  @ManyToOne(() => User, { eager: true })
  createdBy: User;
}
