const { gql } = require('apollo-server');

const counsellorTypeDefs = gql`
  type Counsellor {
    id: ID!
    name: String!
    date: String!
    timeInterval: String!
    isOnline: Boolean!
  }

  type Query {
    getCounsellors: [Counsellor]
  }

  type Mutation {
    createCounsellor(name: String!, date: String!, timeInterval: String!, isOnline: Boolean!): Counsellor
  }
`;

module.exports = counsellorTypeDefs;
