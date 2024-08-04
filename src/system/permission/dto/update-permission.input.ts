import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class UpdatePermissionInput {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  action?: string

  @Field({ nullable: true })
  resource?: string

  @Field(() => [String], { nullable: true })
  roleIds?: string[]
}
