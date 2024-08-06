import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'

// @Entity('system_cdn')
@Entity('cdn')
export class CDN extends BaseEntity {
  @Column()
  name: string

  @Column()
  baseUrl: string

  @Column({ nullable: true })
  description?: string // Optional field for additional information
}
