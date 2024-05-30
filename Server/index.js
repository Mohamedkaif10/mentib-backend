const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const typeDefs = require('./Graphql/schema');
const resolvers = require('./Graphql/resolvers');

const MongoUrl = process.env.DB;
const PORT = process.env.PORT || 4000;

if (!MongoUrl) {
  console.error("Error: MongoDB connection string is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
