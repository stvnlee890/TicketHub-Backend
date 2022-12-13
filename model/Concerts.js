const mongoose = require("../db/connection");

const ConcertSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    tourDates: {
      // String for now, but will change to Dates later
      type: String,
    },
    venue: {
      type: String,
    },
    concertId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Concert", ConcertSchema);
