# GraphQL

To be able to work with GraphQL you'll have to define two things.
- Type Definitions
> define all the fields per object

## Simple version
```graphql
type Person {
  firstName: String
  middleName: String
  lastName: String
  emailAddress: String
  address: Address
  active: Boolean
}

type Address {
  street: String
  city: String
  zipcode: String
  houseNumber: Int
  houseNumberAddition: String
}

# Don't forget to add the (reserved) Query type
# where you can define how they can retrieve the info
type Query {
  # Simple filtering based on a few params - easy to extend
  person(email: String!): Person
}
```

## Advanced version (filtering)

```graphql
# https://graphql.org/graphql-js/mutations-and-input-types/ 
type Person {
  ...
}

...

input PersonFilter {
  emailAddress: String
  lastName: string
  active: Boolean
}

type Query {
  # Simple filtering based on a few params - easy to extend
  ...

  # Advanced filtering with optional params - returning array (or null)
  people(filter: PersonFilter): [Person]
}
```

- resolvers
> define the structure of the fields e.g. nested flows

```javascript
const resolvers = {
  Query: {
    person: async (
      _parent,
      args,
      context,
    ) => {
      const { name } = args

      return await userService.findByName(name)
    },
    orders: async (parent, args, context) => {
      const { status = 'active' } = args

      return await orderService.find({ status: status })
    }
  }
}
```
