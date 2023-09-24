import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account', { schema: 'begt5lzy8mrphehk6xkk' })
export class Account {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('tinyint', { name: 'is_activated', width: 1, default: () => "'0'" })
  isActivated: boolean;

  @Column('varchar', { name: 'status', nullable: true, length: 20 })
  status: string | null;

  @Column('varchar', { name: 'password_hash', nullable: true, length: 255 })
  passwordHash: string | null;

  @Column('varchar', { name: 'password_salt', nullable: true, length: 255 })
  passwordSalt: string | null;

  @Column('int', { name: 'organization_id' })
  organizationId: number;

  @Column('int', { name: 'role_id', nullable: true })
  roleId: number | null;

  @Column('text', { name: 'account_type', nullable: true })
  accountType: string | null;

  @Column('tinyint', {
    name: 'is_phone_verified',
    width: 1,
    default: () => "'0'",
  })
  isPhoneVerified: boolean;

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
