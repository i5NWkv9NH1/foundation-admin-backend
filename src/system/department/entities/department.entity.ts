import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from 'src/system/users/entities/user.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.department)
  users: User[]
}
