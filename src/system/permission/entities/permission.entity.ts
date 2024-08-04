import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../../roles/entities/role.entity'

@ObjectType()
@Entity()
export class Permission {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  action: string

  @Field()
  @Column()
  resource: string

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]
}
