import { BaseEntity } from 'src/shared/entities/base.entity'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm'

export enum AccountRelations {
  Roles = 'roles',
  Organizations = 'organizations'
}
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
export enum State {
  NORMAL = 'NORMAL',
  LOCKED = 'LOCKED'
}
@Entity('sys_account')
export class Account extends BaseEntity {
  @Column()
  name: string

  @Index()
  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl: string

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender

  @Column({ type: 'enum', enum: State, nullable: false })
  state: State

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  address?: string

  @Column()
  password: string

  @Index()
  @Column({ nullable: true, unique: true })
  email?: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'sys_account_role',
    joinColumn: { name: 'account_id' },
    inverseJoinColumn: { name: 'role_id' }
  })
  roles: Role[]

  @ManyToMany(() => Organization)
  @JoinTable({
    name: 'sys_account_organization',
    joinColumn: { name: 'account_id' },
    inverseJoinColumn: { name: 'organization_id' }
  })
  organizations: Organization[]
}
