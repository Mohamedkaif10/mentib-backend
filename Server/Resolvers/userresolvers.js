const User = require("../Model/user");

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw new Error("Error retrieving user");
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error("Error retrieving users");
      }
    },
    hello: () => {
      return "Hello World";
    },
  },
};

module.exports = resolvers;
