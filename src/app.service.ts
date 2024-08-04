import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async getHello() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  }
}
