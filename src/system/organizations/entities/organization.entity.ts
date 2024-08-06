import { BaseEntity } from 'src/shared/entities/base.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity('system_organization')
export class Organization extends BaseEntity {
  @Column()
  label: string

  @Column()
  type: string

  @Column()
  icon: string

  @Column({ nullable: true })
  parentId?: string

  @Column({ nullable: true, type: 'text' })
  path?: string

  @ManyToOne(() => Organization, (organization) => organization.children)
  parent: Organization

  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[]

  @ManyToMany(() => User, (user) => user.organizations)
  users: User[]
}
