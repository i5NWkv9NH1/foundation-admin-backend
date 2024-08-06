import { User } from 'src/system/users/entities/user.entity'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreatePets implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, _connection: Connection): Promise<any> {
    await factory(User)().createMany(2000)
  }
}
