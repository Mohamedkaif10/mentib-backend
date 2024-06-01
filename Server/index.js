const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// const { ApolloServer } = require('apollo-server');
const express = require('express');

const typeDefs = require('./Graphql/schema');
const resolvers = require('./Graphql/resolver');

const MongoUrl = process.env.DB_URL;
const PORT = process.env.PORT;


console.log("MongoUrl", MongoUrl);
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

// New code
const authMiddleware = require('./Middlewares/googleVerification.js');
const verifyToken = require('./Middlewares/verifyToken.js');

app.use('/googleVerification', authMiddleware);
app.use('/graphql', verifyToken);

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start(); // Start the server

    server.applyMiddleware({ app, path: "/graphql" }); // Apply Apollo middleware

    app.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );

}

startApolloServer(); // Call the function to start the server


// Old Server code
// server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
// });
