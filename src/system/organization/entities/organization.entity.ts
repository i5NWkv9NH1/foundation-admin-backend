import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity('sys_organization')
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
  @Column({ nullable: true, type: 'text' })
  labelPath?: string
  @ManyToOne(() => Organization, (_) => _.children)
  parent: Organization
  @OneToMany(() => Organization, (_) => _.parent)
  children: Organization[]
  @ManyToMany(() => Account, (_) => _.organizations)
  accounts: Account[]
}
