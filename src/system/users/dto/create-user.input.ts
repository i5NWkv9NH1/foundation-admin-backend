import { Field, InputType } from '@nestjs/graphql'
import { Stream } from 'stream'
//@ts-ignore
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

@InputType()
export class CreateUserInput {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

  @Field(() => GraphQLUpload)
  avatarUrl: Promise<FileUpload>
}

export interface FileUpload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => Stream
}
