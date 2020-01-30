const express = require('express');
const { Router, } = express;

const { fetchTickets , fetchTicketsByUser} = require('./../models/ticketsModel');

const route = Router({
    mergeParams: true,
});


// fetch all tickets
route.get('/', async (req, res, next)=> {
    const tickets = await fetchTickets();
    res.status(200).json({
        tickets
    })
})

route.get('/:user_id', async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const tickets = await fetchTicketsByUser(user_id);
        
        res.status(200).json({
            message: 'fetch Successful',
            tickets
        }) 
    } catch (error) {
        console.log(error)
                res.status(200).json({
                    message: 'fetch Successful',
                    error: error
                }) 
    }
 
})

module.exports = route;