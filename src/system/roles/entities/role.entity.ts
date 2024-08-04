import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Permission } from '../../permission/entities/permission.entity'
import { User } from '../../users/entities/user.entity'

@ObjectType()
@Entity()
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field(() => [Permission])
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[]

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
