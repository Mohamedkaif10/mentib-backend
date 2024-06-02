const { gql } = require('apollo-server');
const userSchema = require('../Schema/userschema');
const counsellorSchema = require('../Schema/counsellorsschema');
const eventSchema = require('../Schema/eventschema');
const communityschema=require('../Schema/communityschema')

const typeDefs = gql`
  ${userSchema}
  ${counsellorSchema}
  ${eventSchema}
  ${communityschema}
`;

module.exports = typeDefs;