const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// const { ApolloServer } = require('apollo-server');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');

const typeDefs = require('./Graphql/schema');
const resolvers = require('./Graphql/resolver');
require('dotenv').config()
const MongoUrl = process.env.DB_URL;
const PORT = 4000;

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
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (room, msg) => {
        console.log(msg)
        console.log('room', room)
        saveMessagesToDatabase(room, msg);
        socket.broadcast.to(room).emit('message', msg)
    });

    socket.on('joinPrivateRoom', async (room) => {
        socket.join(room);
        const messages = await getMessagesFromDatabase(room);
        console.log(messages);
        socket.emit('initial_messages', messages);
        console.log('joined room', room);
    });

    socket.on('leavePrivateRoom', (room) => {
        socket.leave(room);
        console.log('left room', room);
    });

});

const messageModel = require('./Model/messageModel');

function saveMessagesToDatabase(room, message) {
    const newMessage = new messageModel({
        room: room,
        text: message.text,
        author: message.author,
        createdAt: message.createdAt,
        receiver: message.receiver
    });
    newMessage.save();
}

async function getMessagesFromDatabase(room) {
    return await messageModel.find({room}, {text: 1, author: 1, createdAt: 1, receiver: 1});
}


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

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    httpServer.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );

}

startApolloServer();


// Old Server code
// server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
// });
