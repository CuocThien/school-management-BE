import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test_schedule', { schema: 'sql12650018' })
export class TestSchedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('int', { name: 'class_id', nullable: true })
  classId: number | null;

  @Column('int', { name: 'subject_id', nullable: true })
  subjectId: number | null;

  @Column('int', { name: 'supervisor_id', nullable: true })
  supervisorId: number | null;

  @Column('text', { name: 'room', nullable: true })
  room: string | null;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'1'" })
  isActive: boolean;

  @Column('int', { name: 'score', nullable: true })
  score: number | null;

  @Column('int', { name: 'rank_id', nullable: true })
  rankId: number | null;

  @Column('int', { name: 'semester_id', nullable: true })
  semesterId: number | null;

  @Column('datetime', { name: 'date', nullable: true })
  date: Date | null;

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
