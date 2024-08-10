import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm'

export enum StatusEnum {
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE'
}
export enum TypeEnum {
  GROUP = 'GROUP',
  DEPARTMENT = 'DEPARTMENT',
  COMPANY = 'COMPANY'
  // other types as needed
}

@Entity('sys_organization')
export class Organization extends BaseEntity {
  @Column()
  name: string

  @Index()
  @Column({ unique: true })
  code: string

  @Column({
    type: 'enum',
    enum: TypeEnum,
    default: TypeEnum.GROUP
  })
  type: TypeEnum

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.DISABLE
  })
  status: StatusEnum

  @Column({
    type: 'int',
    default: 0
  })
  sort: number

  @Column()
  icon: string

  @Column({ nullable: true, type: 'text' })
  path: string

  @Column({ nullable: true, default: null, name: 'parentId' })
  parentId: string | null

  @ManyToOne(() => Organization, (organization) => organization.children)
  @JoinColumn({ name: 'parentId' })
  parent: Organization

  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[]

  @ManyToMany(() => Account, (account) => account.organizations)
  accounts: Account[]
}
