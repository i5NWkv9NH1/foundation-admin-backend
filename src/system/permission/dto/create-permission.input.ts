import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreatePermissionInput {
  @Field()
  action: string

  @Field()
  resource: string

  @Field(() => [String])
  roleIds: string[]
}
