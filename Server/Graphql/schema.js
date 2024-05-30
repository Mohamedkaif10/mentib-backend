const { gql } = require('apollo-server');
const userSchema = require('../Schema/userschema');
const counsellorSchema = require('../Schema/counsellorsschema');
const eventSchema = require('../Schema/eventschema');

const typeDefs = gql`
  ${userSchema}
  ${counsellorSchema}
  ${eventSchema}
`;

module.exports = typeDefs;