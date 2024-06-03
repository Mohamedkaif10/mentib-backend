const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getUser(email: String!): User
    getUsers: [User]
    hello: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phone: Int!,
    age:Int!,
    gender:String!,
    role: String!,
    city:String!,
    usedCoins: Int!,
    availableCoins: Int!
  }
  
  type Mutation {
    createUser(name: String!, email: String!, age: Int!, gender: String!, phone: Int!, city: String!, role: String!): User
    updateUser(id: ID!, name: String, email: String, age: Int, gender: String, phone: Int, city: String): User
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;
