const express = require("express");
const UserTicket = require("../model/UserTicket");
const TicketDetails = require("../model/TicketDetails");
const router = express.Router();

router.post("/ticket", async (req, res, next) => {
  const purchaseLimit = +req.body.userPurchaseLimit;
  const userPurchased = +req.body.userPurchased;
  const ticketQuantity = +req.body.quantity - +req.body.userPurchased;

  try {
    console.log("USER PURCHASED", userPurchased);
    const findTicketDetails = await TicketDetails.findOne({
      concertId: req.body.concertId,
    });
    if (findTicketDetails.quantity <= 0) return res.sendStatus(404);
    if (userPurchased > purchaseLimit) return res.sendStatus(406);

    const ticketDetails = await TicketDetails.findOneAndUpdate(
      { concertId: req.body.concertId },
      { $inc: { quantity: -userPurchased } }
      // {quantity: 16}
    );
    console.log("TICKET QUANTITY", ticketDetails.quantity);
    const ticket = await UserTicket.create(req.body);
    await ticket.populate("user");
    return res.status(200).json(ticketDetails);
  } catch (error) {
    console.log(error);
  }
});

router.post("/ticketDetails", async (req, res, next) => {
  try {
    const ticket = TicketDetails.create(req.body);
    return res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
  }
});

router.get("/ticketDetails", async (req, res, next) => {
  try {
    const ticket = await TicketDetails.find({});
    return res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
