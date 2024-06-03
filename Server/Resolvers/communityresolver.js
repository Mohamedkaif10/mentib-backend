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
    createCommunity: async (_, { name, dateCreated, noofpeople, createdby, people, topic }, context) => {
      // if (!context.user || context.user.role !== 'mentor') {
      //   throw new Error('Only mentors can create a community');
      // }

      const user = await User.findById(createdby);
      console.log(user.role);
      if(user.role !== 'mentor') {
        throw new Error('Only mentors can create a community');
      }

      try {
        const newCommunity = new Community({
          name: name,
          dateCreated:dateCreated,
          noofpeople: 1,
          createdby: createdby,
          topic: topic,
          people: [createdby]
        });
        await newCommunity.save();
        const communityId = newCommunity._id;
        return Community.findById(communityId).populate('people').populate('createdby');
      } catch (err) {
        throw new Error('Error creating community');
      }
    },

    joinCommunity: async (_, { communityId, userId }) => {
        try {
            const community = await Community.findById(communityId);
            if (!community) {
              throw new Error('Community not found');
            }
            const user = await User.findById(userId);
            if (!user) {
              throw new Error('User not found');
            }
            community.people.push(userId);
            community.noofpeople = community.noofpeople + 1;
            await community.save();

            return community;
        } catch (err) {
            throw new Error('Error joining community');
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
