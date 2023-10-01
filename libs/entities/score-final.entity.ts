import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('score_final', { schema: 'sql12650018' })
export class ScoreFinal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('int', { name: 'student_id', nullable: true })
  studentId: number | null;

  @Column('tinyint', { name: 'is_pass', width: 1, default: () => "'1'" })
  isPass: boolean;

  @Column('int', { name: 'score', nullable: true })
  score: number | null;

  @Column('int', { name: 'rank_id', nullable: true })
  rankId: number | null;

  @Column('int', { name: 'semester_id', nullable: true })
  semesterId: number | null;

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
