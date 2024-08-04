import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string
}
