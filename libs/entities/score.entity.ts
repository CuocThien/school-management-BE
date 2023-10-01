import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('score', { schema: 'sql12650018' })
export class Score {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('int', { name: 'student_id', nullable: true })
  studentId: number | null;

  @Column('int', { name: 'class_subject_id', nullable: true })
  classSubjectId: number | null;

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

  @Column('decimal', {
    name: 'mini_test_1_score',
    nullable: true,
    precision: 19,
    scale: 1,
  })
  miniTest1Score: string | null;

  @Column('decimal', {
    name: 'mini_test_2_score',
    nullable: true,
    precision: 19,
    scale: 1,
  })
  miniTest2Score: string | null;

  @Column('decimal', {
    name: 'mini_test_3_score',
    nullable: true,
    precision: 19,
    scale: 1,
  })
  miniTest3Score: string | null;

  @Column('decimal', {
    name: 'midterm_test_score',
    nullable: true,
    precision: 19,
    scale: 1,
  })
  midTermTestSscore: string | null;

  @Column('decimal', {
    name: 'endterm_test_score',
    nullable: true,
    precision: 19,
    scale: 1,
  })
  endTermTestScore: string | null;
}
