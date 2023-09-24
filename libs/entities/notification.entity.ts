import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification', { schema: 'begt5lzy8mrphehk6xkk' })
export class Notification {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('text', { name: 'title', nullable: true })
  title: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('text', { name: 'target_type', nullable: true })
  targetType: string | null;

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
