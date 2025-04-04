import { faker } from '@faker-js/faker'
import { Product, User } from './models'

export const getProducts = (amount = 10): Product[] => {
  const products = []

  for (let i = 0; i < amount; i++) {
    products.push({
      id: faker.commerce.isbn(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price())
    })
  }

  return products
}

export const getUsers = (amount = 100): User[] => {
  const users = []

  for (let i = 0; i < amount; i++) {
    users.push({
      firstName : faker.person.firstName(),
      middleName : (i % 3 === 0) ? faker.person.middleName() : '',
      lastName : faker.person.lastName(),
      emailAddress : faker.internet.email().toLowerCase(),
    })
  }

  return users
}
