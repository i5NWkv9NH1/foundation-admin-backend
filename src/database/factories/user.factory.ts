import { faker } from '@faker-js/faker'
import { Account } from 'src/system/accounts/entities/account.entity'
import { define } from 'typeorm-seeding'

define(Account, () => {
  const firstName = faker.person.firstName('female')
  const lastName = faker.person.lastName('female')

  const user = new Account()
  user.name = `${firstName} ${lastName}`
  user.password = faker.word.sample()
  return user
})
