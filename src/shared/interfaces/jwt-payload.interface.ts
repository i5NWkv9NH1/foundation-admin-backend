import type { JwtPayload as Payload } from 'jsonwebtoken'

export interface JwtPayload extends Payload {
  sub: string // 用户 ID
  username: string // 用户名
  [key: string]: any // 其他可能的属性
}
