import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import shuffle from 'lodash/shuffle.js'
import { getProducts, getUsers } from './faker.js'
import { typeDefs, resolvers } from './graphql.js'

const products = getProducts(10)
const users = getUsers(100)

// Inject products into the user
users.forEach(user => {
  for (let p = 0; p < Math.floor(Math.random() * 10); p++) {
    const userProducts = shuffle(products)
    if (!user.products) {
      user.products = []
    }

    user.products.push(userProducts[p])
  }
})


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, { 
  listen: { port: 7589 }
})

console.log(`Server launched at: ${url}`)
