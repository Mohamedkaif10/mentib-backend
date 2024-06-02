const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');

const typeDefs = require('./Graphql/schema');
const resolvers = require('./Graphql/resolver');
require('dotenv').config();
const MongoUrl = process.env.DB;
const PORT = process.env.Port;

console.log("MongoUrl is", MongoUrl);
console.log("PORT", PORT);
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

const authMiddleware = require('./Middlewares/googleVerification.js');
const verifyToken = require('./Middlewares/verifyToken.js');

app.use('/googleVerification', authMiddleware);
app.use('/graphql', verifyToken);

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start(); 

    server.applyMiddleware({ app, path: "/graphql" }); 

    app.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );

}

startApolloServer(); 

