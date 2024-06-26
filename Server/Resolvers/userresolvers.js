const User = require("../Model/userModel");

const resolvers = {
  Query: {
    getUser: async (_, { email }) => {
      try {
        const user = await User.findOne({
          email: email
        });
        return user;
      } catch (err) {
        throw new Error("Error retrieving user");
      }
    },
    getUsers: async (_, {role}) => {
      try {
        const users = await User.find({role: role});
        return users;
      } catch (err) {
        throw new Error("Error retrieving users");
      }
    },
    hello: () => {
      return "Hello World";
    },
  },
  Mutation: {
    createUser: async (_, { name, email, age, gender, phone, city, role }) => {
      try {
        const user = new User({
          name: name, email: email, age: age,
          gender: gender, role: role, phone: phone,
          city: city, usedCoins: 0, availableCoins: 0
        });
        await user.save();
        return user;
      } catch (err) {
        throw new Error("Error creating user");
      }
    },
    updateUser: async (_, { id, name, email, age, gender, phone, city }) => {
      try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        );
        return user;
      } catch (err) {
        throw new Error("Error updating user");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndRemove(id);
        return user;
      } catch (err) {
        throw new Error("Error deleting user");
      }
    },
  }
};

module.exports = resolvers;
