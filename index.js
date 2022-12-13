const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// REDIRECT 
app.get('/', (req, res) => {
    res.redirect('/api/tickethub');
})

// CONTROLLERS
const userController = require("./controller/UserController");
app.use("/api/tickethub/users", userController);

const ticketController = require("./controller/TicketController");
app.use("/api/tickethub/tickets", ticketController);

const concertController = require("./controller/ConcertController");
app.use("/api/tickethub/concerts", concertController)

// PORT
const PORT = 8800
app.listen(PORT, () => console.log(`=== BACKEND SERVER RUNNING. LOCAL HOST: ${PORT} ===`))