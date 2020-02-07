
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

//Xss (cross site scripting) prevent against hackers sending in malicious links/data through forms tp the backend to hack the system and collect data
const xss = require('xss-clean');
const app = express();

const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const ticketRoutes = require("./routes/ticketRoutes");


app.use(xss())
//helmet secures or app by setting various http headers
app.use(helmet());

app.use(express.json({limit: '10mb'}))
// body-parser parses request bodies to json
app.use(bodyParser.urlencoded({ extended: false}));
//enables clients to make request to our endpoints
app.use(cors());

//Routes

app.use('/auth/user', userRoutes);
app.use('/auth/admin', adminRoutes);
app.use("/api/tickets", ticketRoutes);



app.get('/', async (req, res)=>{
    res.send('Welcome to DevDesk / endpoint')
})

app.get((err,req, res, next)=>{
    res.status(404).json({
            message: 'Server Error',
            err
    })
})


if(!module.parent){
    app.listen(PORT, console.log(`app listening to http://localhost:${PORT}`));
}


module.exports = app;