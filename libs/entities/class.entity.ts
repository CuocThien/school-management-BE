import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class', { schema: 'begt5lzy8mrphehk6xkk' })
export class Class {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('int', { name: 'grade_id', nullable: true })
  gradeId: number | null;

  @Column('int', { name: 'teacher_id', nullable: true })
  teacherId: number | null;

  @Column('int', { name: 'total_students', nullable: true })
  totalStudents: number | null;

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
