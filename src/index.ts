import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import shuffle from 'lodash/shuffle.js'
import { getProducts, getUsers } from './faker.js'
import { typeDefs } from './graphql.js'
import { GraphQLError } from 'graphql'
import 'dotenv/config'

const products = getProducts(10)
const users = getUsers(100)

// Inject products into the user
users.forEach(user => {
  for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    const userProducts = shuffle(products)

    user.products = user.products ?? []
    user.products.push(userProducts[i])
  }
})

// Setup the required resolvers
const resolvers = {
  Query: {
    users: (_, { filters }) => users.filter(user => {
      console.log('user', user)
      for (const key in filters) {
        if (filters[key] !== user[key]) {
          return false
        }
      }

      return true
    }),
    product: (_, args, context) => {
      console.log('context', context)

      return products.find(product => product.id === args.id)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const isValid = (username: string, password: string) => {
  return username === process.env.USERNAME && password === process.env.PASSWORD
}

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT || '7589') },
  context: async ({ req }) => {
    const [,user] = req.headers.authorization.split(' ')
    const [username, password] = atob(user).split(':')

    if (!user || !isValid(username, password)) {
      throw new GraphQLError('You\'re not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }
        }
      })
    }

    return {
      user: {
        name: username
      } 
    }
  }
})

console.log(`🚀 Server launched at: ${url}`)
