import { Field, InputType } from '@nestjs/graphql'
import { Stream } from 'stream'
//@ts-ignore

@InputType()
export class CreateUserInput {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  avatarUrl: string
}

export interface FileUpload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => Stream
}
