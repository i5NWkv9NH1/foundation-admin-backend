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
  FEMALE = 'FEMALE',
  PRIVATE = 'PRIVATE'
}
export enum StatusEnum {
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE'
}
@Entity('sys_account')
export class Account extends BaseEntity {
  @Column({ nullable: true })
  name: string

  @Index()
  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: true, name: 'avatarUrl' })
  avatarUrl: string

  @Column({ type: 'enum', enum: Gender, default: Gender.PRIVATE })
  gender: Gender

  @Column({
    type: 'enum',
    enum: StatusEnum,
    nullable: false,
    default: StatusEnum.ENABLE
  })
  status: StatusEnum

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  address?: string

  @Column()
  password: string

  @Index()
  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ select: false, nullable: true })
  originPassword: string | null

  @ManyToMany(() => Role, (role) => role.accounts)
  // @JoinTable({
  //   name: 'sys_account_role',
  //   joinColumn: { name: 'accountId' },
  //   inverseJoinColumn: { name: 'roleId' }
  // })
  roles: Role[]

  // TODO
  @ManyToMany(() => Organization, (organization) => organization.accounts)
  @JoinTable({
    name: 'sys_account_organization', // 中间表名称
    joinColumn: { name: 'accountId' }, // 当前实体的连接字段
    inverseJoinColumn: { name: 'organizationId' } // 关联实体的连接字段
  })
  organizations: Organization[]
}
