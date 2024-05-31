const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const typeDefs = require('./Graphql/schema');
const resolvers = require('./Graphql/resolver');

// const MongoUrl = process.env.DB;
// const PORT = process.env.PORT || 4000;

const MongoUrl = 'mongodb://localhost:27017/graphql';
const PORT = 4000;

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

const server = new ApolloServer({ typeDefs, resolvers});
const app = express();

// New code
const authMiddleware = require('./Middlewares/auth.js');

app.use('/', authMiddleware);

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start(); // Start the server

    server.applyMiddleware({ app }); // Apply Apollo middleware

    app.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );

}

startApolloServer(); // Call the function to start the server


// Old Server code
// server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
// });
