const { gql } = require('apollo-server-express');

const communityTypeDefs = gql`
  type Community {
    id: ID!
    name: String!
    dateCreated: String!
    noofpeople: Int!
    createdby: User!
    topic: String!
    people: [User!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    gender: String!
    phone: String!
    city: String!
    role: String!
    usedCoins: Int
    availableCoins: Int
  }

  type Query {
    getCommunity(id: ID!): Community
    getCommunities: [Community!]
  }

  type Mutation {
    createCommunity(name: String!, dateCreated: String!, noofpeople: Int, createdby: ID!, topic: String! people: [ID!]): Community
    joinCommunity(communityId: ID!, userId: ID!): Community
    updateCommunity(id: ID!, name: String, noofpeople: Int, createdby: ID, people: [ID!]): Community
    deleteCommunity(id: ID!): Boolean
  }
`;

module.exports = communityTypeDefs;
