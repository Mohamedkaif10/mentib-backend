const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    hello: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phoneno: Number!,
    age:Number!,
    gender:String!,
    city:String
  }
`;

module.exports = typeDefs;
