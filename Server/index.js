const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./Graphql/schema");
const resolvers = require("./Graphql/resolvers");
const dotenv = require("dotenv")
const app = express();
dotenv.config();
const MongoUrl = process.env.DB;
const PORT = process.env.port 
if (!MongoUrl) {
  console.error("Error: MongoDB connection string is not defined in environment variables.");
  process.exit(1);
}
mongoose.connect(MongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });


app.use(
  "/",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});