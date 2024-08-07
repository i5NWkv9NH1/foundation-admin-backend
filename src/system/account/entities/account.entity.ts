import { BaseEntity } from 'src/shared/entities/base.entity'
import { Organization } from 'src/system/organization/entities/organization.entity'
import { Role } from 'src/system/role/entities/role.entity'
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm'

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
  @Column({ nullable: false, unique: true })
  username: string
  @Column({ nullable: true })
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
  @Column({ nullable: true })
  email?: string
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'sys_account_role',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'roleId' }
  })
  roles: Role[]
  @ManyToMany(() => Organization)
  @JoinTable({
    name: 'sys_account_organization',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'organizationId' }
  })
  organizations: Organization[]
}
