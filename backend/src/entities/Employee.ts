import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Department } from './Department';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Column({ type: 'date' })
  hireDate!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary!: number;

  @ManyToOne(() => Department, (department) => department.employees, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'departmentId' })
  department?: Department;

  @Column({ type: 'uuid', nullable: true })
  departmentId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
