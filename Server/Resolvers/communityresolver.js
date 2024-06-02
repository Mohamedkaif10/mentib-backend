const Community = require('../Model/communityModel');
const User = require('../Model/userModel');

const communityResolvers = {
  Query: {
    getCommunity: async (_, { id }) => {
      try {
        const community = await Community.findById(id).populate('people').populate('createdby');
        return community;
      } catch (err) {
        throw new Error('Error retrieving community');
      }
    },
    getCommunities: async () => {
      try {
        const communities = await Community.find().populate('people').populate('createdby');
        return communities;
      } catch (err) {
        throw new Error('Error retrieving communities');
      }
    },
  },
  Mutation: {
    createCommunity: async (_, { name, dateCreated, noofpeople, createdby, people }, context) => {
      if (!context.user || context.user.role !== 'mentor') {
        throw new Error('Only mentors can create a community');
      }

      try {
        const newCommunity = new Community({
          name,
          dateCreated,
          noofpeople,
          createdby,
          people
        });
        const savedCommunity = await newCommunity.save();
        return savedCommunity.populate('people').populate('createdby');
      } catch (err) {
        throw new Error('Error creating community');
      }
    },
    updateCommunity: async (_, { id, name, noofpeople, createdby, people }) => {
      try {
        const updatedCommunity = await Community.findByIdAndUpdate(
          id,
          { name, noofpeople, createdby, people },
          { new: true }
        ).populate('people').populate('createdby');
        return updatedCommunity;
      } catch (err) {
        throw new Error('Error updating community');
      }
    },
    deleteCommunity: async (_, { id }) => {
      try {
        const deleted = await Community.findByIdAndDelete(id);
        return !!deleted;
      } catch (err) {
        throw new Error('Error deleting community');
      }
    },
  },
};

module.exports = communityResolvers;
