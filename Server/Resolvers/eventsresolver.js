const Event = require("../Model/event");

const eventResolvers = {
  Query: {
    getEvent: async (_, { id }) => {
      try {
        const event = await Event.findById(id);
        return event;
      } catch (err) {
        throw new Error("Error retrieving event");
      }
    },
    getEvents: async () => {
      try {
        const events = await Event.find();
        return events;
      } catch (err) {
        throw new Error("Error retrieving events");
      }
    },
  },
};

module.exports = eventResolvers;
