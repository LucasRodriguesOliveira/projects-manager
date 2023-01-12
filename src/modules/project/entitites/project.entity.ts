import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  // Prefiro utilizar camelCase
  @Column({ type: 'varchar' })
  zipCode: string;

  @Column({ type: 'decimal' })
  cost: number;

  @Column({ type: 'bit', default: 0 })
  done: boolean;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ type: 'varchar' })
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
