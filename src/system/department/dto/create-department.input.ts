import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateDepartmentInput {
  @Field()
  name: string
}
