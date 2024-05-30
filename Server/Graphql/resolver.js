const { merge } = require('lodash');
const counsellorResolvers = require('../Resolvers/counsellorresolvers');
const eventResolvers = require('../Resolvers/eventsresolver'); 
const userResolvers = require('../Resolvers/userresolvers');
const rootResolvers = {
  Query: {
    _empty: () => "Hello World",
  },
  Mutation: {
    _empty: () => "Hello World",
  }
};

const resolvers = merge(rootResolvers, counsellorResolvers,eventResolvers,userResolvers);

module.exports = resolvers;
