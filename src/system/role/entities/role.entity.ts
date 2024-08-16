import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import { Action } from 'src/system/action/entities/action.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

export enum RoleRelations {
  Actions = 'actions'
}
export enum StatusEnum {
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE'
}
// export enum RoleName {
//   Root = 'ROOT',
//   Admin = 'ADMIN',
//   User = 'USER',
//   GUEST = 'GUEST'
// }

@Entity('sys_role')
export class Role extends BaseEntity {
  @Column()
  label: string

  // @Column({ type: 'enum', enum: RoleName, default: RoleName.User })
  // name: RoleName
  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string

  @Column({
    type: 'enum',
    enum: StatusEnum,
    nullable: false,
    default: StatusEnum.ENABLE
  })
  status: StatusEnum

  @Column({
    type: 'int',
    default: 0
  })
  sort: number

  // ? 删除角色后解绑中间表
  @ManyToMany(() => Account, (_) => _.roles, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'sys_account_role',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'accountId' }
  })
  accounts: Account[]

  @ManyToMany(() => Action, (_) => _.roles)
  @JoinTable({
    name: 'sys_role_action',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'actionId' }
  })
  actions: Action[]
}
