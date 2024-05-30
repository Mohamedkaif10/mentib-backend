const { gql } = require('apollo-server');

const eventTypeDefs = gql`
  type Query {
    getEvent(id: ID!): Event
    getEvents: [Event]
  }

  type Event {
    id: ID!
    name: String!
    location: String!
    date: String!
  }
`;

module.exports = eventTypeDefs;
