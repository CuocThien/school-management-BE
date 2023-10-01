import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department_teacher', { schema: 'sql12650018' })
export class DepartmentTeacher {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('tinyint', { name: 'is_chief', width: 1, default: () => "'0'" })
  isChief: boolean;

  @Column('int', { name: 'department_id', nullable: true })
  departmentId: number | null;

  @Column('int', { name: 'teacher_id', nullable: true })
  teacherId: number | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @Column('int', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @Column('int', { name: 'deleted_by', nullable: true })
  deletedBy: number | null;
}
