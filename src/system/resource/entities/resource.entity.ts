import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
@Entity()
export class Resource {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string
}
