const express = require("express");
const UserTicket = require("../model/UserTicket");
const TicketDetails = require("../model/TicketDetails");
const User = require("../model/Users");
const router = express.Router();

router.post("/ticket", async (req, res, next) => {
  const purchaseLimit = +req.body.userPurchaseLimit;
  const userPurchased = +req.body.userPurchased;
  console.log(req.body.user);

  try {
    // find ticketDetails so we can decrement overall ticket count for that specific ticket type and event
    const findTicketDetails = await TicketDetails.findOne({
      concertId: req.body.concertId,
    });
    const findTicket = await UserTicket.find({ user: req.body.user });
    console.log(findTicket);
    // set up logic top level to immediately return if tickets aren't available
    if (
      findTicketDetails.quantity <= 0 ||
      userPurchased > findTicketDetails.quantity
    )
      return res.sendStatus(404);
    if (userPurchased > purchaseLimit) return res.sendStatus(406);

    // update ticket details so that client can receive proper ticket number
    await TicketDetails.findOneAndUpdate(
      { concertId: req.body.concertId },
      { $inc: { quantity: -userPurchased } }
    );
    // creating user ticket after user purchase
    const ticket = await UserTicket.create(req.body);
    await ticket.populate("user");
    return res.status(200).json(ticket);
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

router.get("/ticketDetails/", async (req, res, next) => {
  try {
    const ticket = await TicketDetails.find({});
    return res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
