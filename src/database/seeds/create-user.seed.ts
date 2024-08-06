import { Account } from 'src/system/accounts/entities/account.entity'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreatePets implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, _connection: Connection): Promise<any> {
    await factory(Account)().createMany(2000)
  }
}
