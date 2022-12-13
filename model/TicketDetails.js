const mongoose = require("../db/connection");

const TicketDetailSchema = new mongoose.Schema(
  {
    concertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
    },
    ticketType: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TicketDetails", TicketDetailSchema);
