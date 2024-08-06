import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import { Action } from '../../../system/actions/entities/action.entity'
import { User } from '../../../system/users/entities/user.entity'

@Entity('system_role')
export class Role extends BaseEntity {
  @Column()
  name: string

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: 'system_user_role',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'userId' }
  })
  users: User[]

  @ManyToMany(() => Action, (action) => action.roles)
  @JoinTable({
    name: 'system_role_action',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'actionId' }
  })
  actions: Action[]
}
