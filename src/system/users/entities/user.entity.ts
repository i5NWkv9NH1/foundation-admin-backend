import { Field, ObjectType } from '@nestjs/graphql'
import { Department } from 'src/system/department/entities/department.entity'
import { Role } from 'src/system/roles/entities/role.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column()
  email: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl: string // Field to store the avatar URL

  @Field(() => Department, { nullable: true })
  @ManyToOne(() => Department, (department) => department.users, {
    nullable: true
  })
  department: Department

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[]
}
