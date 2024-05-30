const { gql } = require('apollo-server');
const userSchema = require('../Schema/userschema');
const counsellorSchema = require('../Schema/counsellorsschema');


const typeDefs = gql`
  ${userSchema}
  ${counsellorSchema}
`;

module.exports = typeDefs;