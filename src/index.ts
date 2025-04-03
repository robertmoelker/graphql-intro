import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { faker } from '@faker-js/faker'

// NOTE: Define the type (e.g. User, Profile, UserSettings) and the type `Query` is reserved.
const typeDefs = `#graphql
  type User {
    firstName: String
    middleName: String
    lastName: String
    emailAddress: String
  }

  type Order {
    id: Number
    description: String
    price: Number
    createdAt: Number // NOTE: will be stored as unixtimestamp
  }

  type Query {
    users: [User]
  }
`

type Products = {
  name: String
  description: String
  price: Number
}

const products: Products = []

for (let i = 0; i < 100; i++) {
  products.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price()
  })
}

// NOTE: Use faker to generate users.
const users = []
for (let i = 0; i < 100; i++) {
  // NOTE: setup orders per user
  const orders = []
  users.push({
    firstName: faker.person.firstName(),
    middleName: (i % 3 === 0) ? faker.person.middleName() : '',
    lastName: faker.person.lastName(),
    emailAddress: faker.internet.email().toLowerCase(),
  })

  for (let x = 0; x < 5; i++) {
    console.log('x', x)
  }

  // NOTE: use faker to generate fake order items as well
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
