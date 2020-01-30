const express = require("express");
const { Router } = express;
const restricted = require("./../middleware/restricted");
const { fetchUserById } = require("./../models/userModels");
const {
  fetchTickets,
  fetchTicketsByUser
} = require("./../models/ticketsModel");

const route = Router({
  mergeParams: true
});

// fetch all tickets
route.get("/", async (req, res, next) => {
  const tickets = await fetchTickets();
  res.status(200).json({
    tickets
  });
});

route.get("/:user_id/tickets",  async (req, res, next) => {
   
  try {
    const user_id = req.params.user_id;
    const user = await fetchUserById(user_id);
    if (!user_id) {
      return res.status(400).json({
        message: "Please provide a user_id param"
      });

    } else if (!user) {
      return res.status(404).json({
        message: `User at the  {id: ${user_id}} doesn't exist in the db`
      });

    } else{
        const data = await fetchTicketsByUser(user_id);

        res.status(200).json({
        message: "fetch Successful",
        data
        });
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error
    });
  }
});

module.exports = route;
