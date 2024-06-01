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
  
  type Mutation {
    createEvent(name: String!, location: String!, date: String!): Event
    updateEvent(id: ID!, name: String, location: String, date: String): Event
    deleteEvent(id: ID!): Event
  }
  
`;

module.exports = eventTypeDefs;
