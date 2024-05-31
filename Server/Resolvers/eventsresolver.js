const Event = require("../Model/eventModel");

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

  Mutation: {
    createEvent: async (_, { name, location, date }) => {
      // const date_ = new Date(date);
      try {
        const event = new Event({
          name,
          location,
          date,
        });
        console.log("creating event");
        await event.save();
        console.log("event created")
        return event;
      } catch (err) {
        throw new Error("Error creating event");
      }
    },
    updateEvent: async (_, { id, name, location, date }) => {
      try {
        const event = await Event.findByIdAndUpdate(
          id,
          {
            name,
            location,
            date,
          },
          { new: true }
        );
        return event;
      } catch (err) {
        throw new Error("Error updating event");
      }
    },
    deleteEvent: async (_, { id }) => {
      try {
        const event = await Event.findByIdAndDelete(id);
        return event;
      } catch (err) {
        throw new Error("Error deleting event");
      }
    },
  },

};

module.exports = eventResolvers;
