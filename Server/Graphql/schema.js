const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    gender: String!
    phone: Int!
    usedCoins: Int!
    availableCoins: Int!
  }

  type Query {
    getUser(email: String!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!, gender: String!, phone: Int!, city: String!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): User
  }
`);

module.exports = schema;