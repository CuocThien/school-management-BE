import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile', { schema: 'begt5lzy8mrphehk6xkk' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('int', { name: 'account_id', nullable: true })
  accountId: number | null;

  @Column('varchar', { name: 'full_name', nullable: true, length: 255 })
  fullName: string | null;

  @Column('datetime', { name: 'birthday', nullable: true })
  birthday: Date | null;

  @Column('varchar', { name: 'phone', length: 15 })
  phone: string;

  @Column('int', { name: 'parent_id', nullable: true })
  parentId: number | null;

  @Column('text', { name: 'avatar', nullable: true })
  avatar: string | null;

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
