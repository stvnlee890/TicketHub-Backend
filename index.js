const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors)

// ROUTES


// PORT

const PORT = process.env.PORT || 8800
app.listen(PORT, () => console.log("=== BACKEND SERVER RUNNING. LOCAL HOST: 8800 ==="))