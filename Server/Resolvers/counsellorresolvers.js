const Counsellor = require('../Model/counsellorModel');

const counsellorResolvers = {
  Query: {
    getCounsellors: async () => {
      try {
        const counsellors = await Counsellor.find();
        return counsellors;
      } catch (err) {
        throw new Error("Error retrieving counsellors");
      }
    },
  },
  Mutation: {
    createCounsellor: async (_, { name, date, timeInterval, isOnline }) => {
      try {
        const counsellor = new Counsellor({ name, date, timeInterval, isOnline });
        await counsellor.save();
        return counsellor;
      } catch (err) {
        throw new Error("Error creating counsellor");
      }
    },
  },
};

module.exports = counsellorResolvers;
