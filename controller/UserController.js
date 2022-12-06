const router = require("express").Router();
const User = require("../model/Users");

router.post("./signup", async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body, password });
        console.log(req.body)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;