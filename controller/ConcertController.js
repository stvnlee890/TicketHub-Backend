const express = require("express");
const router = express.Router();
const Concert = require("../model/Concerts");

router.post("/", async (req, res, next) => {
  try {
    const concerts = await Concert.create(req.body);
    return res.status(200).json(concerts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const concerts = await Concert.find({});
    return res.status(200).json(concerts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
