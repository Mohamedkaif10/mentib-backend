const { merge } = require('lodash');
const counsellorResolvers = require('../Resolvers/counsellorresolvers');

const rootResolvers = {
  Query: {
    _empty: () => "Hello World",
  },
  Mutation: {
    _empty: () => "Hello World",
  }
};

const resolvers = merge(rootResolvers, counsellorResolvers);

module.exports = resolvers;
