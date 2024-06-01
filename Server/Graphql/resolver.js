const { merge } = require('lodash');
const { mergeResolvers } = require("@graphql-tools/merge");
const counsellorResolvers = require('../Resolvers/counsellorresolvers');
const eventResolvers = require('../Resolvers/eventsresolver'); 
const userResolvers = require('../Resolvers/userresolvers');

const resolvers = mergeResolvers([counsellorResolvers, eventResolvers, userResolvers]);

module.exports = resolvers;
