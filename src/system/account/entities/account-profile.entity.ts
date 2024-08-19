import { BaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, Index, OneToOne } from 'typeorm'
import { Account } from './account.entity'
import { Gender, StatusEnum } from './account.type'

@Entity('sys_account_profile')
export class AccountProfile extends BaseEntity {
  // @Column()
  // accountId: string

  // @OneToOne(() => Account, (_) => _.profile, {
  //   nullable: false,
  //   onDelete: 'CASCADE'
  // })
  // account: Account
  @OneToOne(() => Account, (account) => account.profile, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  account: Account

  @Index()
  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  address?: string

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
  avatarUrl: string // 用户头像的URL

  @Column({ nullable: true })
  bannerUrl: string // 用户Banner的URL

  @Column({ nullable: true })
  bio: string // 用户的简介或个性签名

  @Column({ nullable: true })
  website: string // 用户个人网站的URL

  @Column({ nullable: true })
  location: string // 用户所在地

  @Column('json', { nullable: true })
  socialMediaLinks: Record<string, string>
}
