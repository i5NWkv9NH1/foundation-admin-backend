import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  permissionIds?: string[]
}
