const express = require('express');
const { Router, } = express;

const { fetchTickets } = require('./../models/ticketsModel');

const route = Router({
    mergeParams: true,
});


// getch all tickets
route.get('/', async (req, res, next)=> {
    const tickets = await fetchTickets();
    res.status(200).json({
        tickets
    })
})


module.exports = route;