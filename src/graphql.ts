// NOTE: Define the type (e.g. User, Profile, UserSettings) and the type `Query` is reserved.
export const typeDefs = `#graphql
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
    products(id: ID!): [Product]
  }
`

// Setup a resolver - so that ApolloServer knows which list to return on what certain query
export const resolvers = {
  Query: {
    users: () => users,
    // products: (userId: ID!): [Product 
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
