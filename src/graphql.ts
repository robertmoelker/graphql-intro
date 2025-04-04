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

  input UserFilter {
    emailAddress: String
    lastName: String
    active: Boolean
  }

  type Query {
    users(filters: UserFilter): [User]
    product(id: String!): Product
  }
`
