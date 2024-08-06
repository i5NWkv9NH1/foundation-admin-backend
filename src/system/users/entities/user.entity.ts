import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import { Organization } from '../../../system/organizations/entities/organization.entity'
import { Role } from '../../../system/roles/entities/role.entity'

@Entity('system_user')
export class User extends BaseEntity {
  @Column({ length: 36 })
  name: string

  @Column()
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column({
    nullable: true,
    default: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
  })
  avatarUrl: string

  @ManyToMany(() => Organization, (organization) => organization)
  @JoinTable({
    name: 'system_user_organization',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'organizationId' }
  })
  organizations: Organization[]

  @ManyToMany(() => Role, (role) => role)
  @JoinTable({
    name: 'system_user_role',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' }
  })
  roles: Role[]
}
