const express = require("express");
const { Router } = express;
const restricted = require("./../middleware/restricted");
const { fetchUserById } = require("./../models/userModels");
const {
  fetchTickets,
  fetchTicketsByUser,
  addTicket,
  updateTicket,
  deleteTicket,
  fetchTicketById
  
} = require("./../models/ticketsModel");

const route = Router({
  mergeParams: true
});

// fetch all tickets
route.get("/", restricted(), async (req, res, next) => {
  try {
    const tickets = await fetchTickets();
    res.status(200).json({
      message: 'Fetch Successful',
      tickets
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});

route.get("/:user_id", restricted(), async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      return res.status(400).json({
        message: "Please provide a user_id param"
      });
    } else {
      const user = await fetchUserById(user_id);
      if (!user) {
        return res.status(404).json({
          message: `User at the  {id: ${user_id}} doesn't exist in the db`
        });
      } else {
        const data = await fetchTicketsByUser(user_id);

        res.status(200).json({
          message: "fetch Successful",
          data
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});


// Create Ticket
route.post("/:user_id", restricted(), async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await fetchUserById(user_id);

    if(!user){
      return res.status(403).json({
        message: `user with Id of ${user_id} does not exist`
      });
    }
    const { title, description, attempted_solution, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are requires to add a new ticket"
      });
    } else if (!user) {
      return res.status(404).json({
        message: `User at the  {id: ${user_id}} doesn't exist in the db`
      });
    } else {
      const ticket = await addTicket({
        title,
        description,
        attempted_solution,
        completed,
        user_id
      });

      res.status(201).json({
        message: "Successfully created A ticket",
        ticket
      });
    }
  } catch (error) {
    next(error);
  }
});



route.put('/:ticket_id', restricted(), async (req, res, next) => {
  let {title,description,created_date,created_by,assigned_to, attempted_solution, completed } = req.body;
  const ticket_id = req.params.ticket_id;
  if(!ticket_id){
    return res.status(400).json({
      message: `ticket_id is undefined`
    })
  }
  else if (!title || !description || !assigned_to ||  !attempted_solution ){
    req.status(404).json({
      message: 'Please make sure you are providing all the necessary info for updating a tickets'
    })
  }else {
    const ticket = await updateTicket(ticket_id, {
      title,
      description,
      created_date,
      created_by,
      assigned_to, 
      attempted_solution, 
      completed })
      res.status(200).json({
        ticket
      })
  }
 });

 //Delete endpoint  
 route.delete('/:ticket_id', (req, res, next) => {
    const { ticket_id } = req.params;
     if(!ticket_id){
       return res.status(404).json({
         error: 'Error, ticket_id is undefined'
       });
     }
     const ticket = fetchTicketById(ticket_id);
     if(!ticket){
       res.status(400).json({
         message: `Counld't find ticket at ${ticket_id} in the db`
       })
     }
 })
module.exports = route;