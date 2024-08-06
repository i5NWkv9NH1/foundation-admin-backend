import { faker } from '@faker-js/faker'
import { User } from 'src/system/users/entities/user.entity'
import { define } from 'typeorm-seeding'

define(User, () => {
  const firstName = faker.person.firstName('female')
  const lastName = faker.person.lastName('female')

  const user = new User()
  user.name = `${firstName} ${lastName}`
  user.password = faker.word.sample()
  return user
})
