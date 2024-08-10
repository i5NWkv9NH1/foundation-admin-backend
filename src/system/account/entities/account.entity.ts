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
export enum StatusEnum {
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE'
}
@Entity('sys_account')
export class Account extends BaseEntity {
  @Column()
  name: string

  @Index()
  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: true, name: 'avatarUrl' })
  avatarUrl: string

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender

  @Column({
    type: 'enum',
    enum: StatusEnum,
    nullable: false,
    default: StatusEnum.ENABLE
  })
  state: StatusEnum

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  address?: string

  @Column()
  password: string

  @Index()
  @Column({ nullable: true, unique: true })
  email?: string

  @ManyToMany(() => Role, (role) => role.accounts)
  // @JoinTable({
  //   name: 'sys_account_role',
  //   joinColumn: { name: 'accountId' },
  //   inverseJoinColumn: { name: 'roleId' }
  // })
  roles: Role[]

  @ManyToMany(() => Organization, (organization) => organization.accounts)
  @JoinTable({
    name: 'sys_account_organization', // 中间表名称
    joinColumn: { name: 'accountId' }, // 当前实体的连接字段
    inverseJoinColumn: { name: 'organizationId' } // 关联实体的连接字段
  })
  organizations: Organization[]
}
