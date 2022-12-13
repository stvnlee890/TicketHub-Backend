const mongoose = require("../db/connection");

const UserTicketSchema = new mongoose.Schema(
  {
    concertTitle: {
      type: String,
      required: true,
    },
    ticketId: {
      type: String,
      required: true,
    },
    concertId: {
      type: String,
      required: true,
    },
    userPurchased: {
      type: Number,
      required: true,
    },
    userPurchaseLimit: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserTicketModel", UserTicketSchema);
