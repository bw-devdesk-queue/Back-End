require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const UserModel = require('./models/userModels')

const PORT = process.env.PORT || 5000

//helmet secures or app by setting various http headers
app.use(helmet());
// body-parser parses request bodies to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//enables clients to make request to our endpoints
app.use(cors())

app.get('/', async (req, res)=>{
    const user = await UserModel.fetchUsers();
    console.log(user)
    res.send('Welcome to DevDesk / endpoint')
})

app.listen(PORT, console.log(`app listening to http://localhost:${PORT}`))