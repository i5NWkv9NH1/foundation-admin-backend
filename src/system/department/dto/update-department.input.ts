import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class UpdateDepartmentInput {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  name?: string
}
