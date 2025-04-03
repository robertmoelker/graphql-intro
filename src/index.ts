import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { faker } from '@faker-js/faker'
import shuffle from 'lodash/shuffle.js'

// NOTE: Define the type (e.g. User, Profile, UserSettings) and the type `Query` is reserved.
const typeDefs = `#graphql
  type User {
    firstName: String
    middleName: String
    lastName: String
    emailAddress: String
    products: [Product]
  }

  type Product {
    id: String
    description: String
    price: Float
    createdAt: Int
  }

  type Query {
    users: [User]
  }
`
type User = {
  firstName: String
  middleName: String
  lastName: String
  emailAddress: String
  products?: Product[]
}

type Product = {
  id: string
  name: string
  description: string
  price: Number
}

const products: Product[] = []

for (let i = 0; i < 100; i++) {
  products.push({
    id: faker.commerce.isbn(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price())
  })
}

// NOTE: Use faker to generate users.
const users: User[] = []

for (let i = 0; i < 100; i++) {
  // NOTE: setup orders per user
  const product: Product = null
  const user: User = {
    firstName : faker.person.firstName(),
    middleName : (i % 3 === 0) ? faker.person.middleName() : '',
    lastName : faker.person.lastName(),
    emailAddress : faker.internet.email().toLowerCase(),
    products: [],
  }

  const amountProducts = Math.floor(Math.random() * 10)

  for (let p = 0; p < amountProducts; p++) {
    const userProducts = shuffle(products)
    console.log('userProducts', userProducts)
    user.products.push(userProducts[p])
  }

  users.push(user)
}

// Setup a resolver - so that ApolloServer knows which list to return on what certain query
const resolvers = {
  Query: {
    users: () => users,
    // TODO: Investigate how the nested structure will work
    // e.g. fetch all the orders related to the `users` could be connected via 
    // [{ 
    // user_id: xyz, 
    // emailAddress: 'r.moelker@labdigital.nl', 
    // orders: [{ order_id: 'xyz', 
    //   products: [{ 
    //     name: 'product-name-here', price: 500.00 
    //   }, { 
    //     name: 'second-product-here', price: 585.00 
    //   }]
    // }]
    // orders: () => orders,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, { 
  listen: { port: 7589 }
})

console.log(`Server launched at: ${url}`)
