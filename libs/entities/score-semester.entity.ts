import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('score_semester', { schema: 'sql12650018' })
export class ScoreSemester {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('int', { name: 'class_student_id', nullable: true })
  classStudentId: number | null;

  @Column('decimal', {
    name: 'average_score',
    nullable: true,
    precision: 19,
    scale: 1,
  })
  averageScore: number | null;

  @Column('varchar', { name: 'rank', nullable: true })
  rank: string | null;

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
