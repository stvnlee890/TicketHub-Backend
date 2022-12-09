const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt = require("bcrypt");
const { createUserToken } = require("../auth/auth");

router.post("/signup", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password });
    console.log(req.body);
    console.log(user);
    return res.json({ body: user, status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.findOne({ email: req.body.email });
    // send token to secure routes for user profile for when they purchase their ticket
    const token = createUserToken(req, user);
    res.status(201).json({ token, user, status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(error)
  }
});

module.exports = router;
