const mongoose = require("../db/connection");

const TicketDetailSchema = new mongoose.Schema({
    concertId: {
        type: String,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("TicketDetails", TicketDetailSchema)