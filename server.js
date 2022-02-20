require('dotenv').config();

const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const { getAllByRange } = require('./controllers/FishController');

app.use(bodyParser.json());

//route list
const apiRoutes = express.Router()

app.use('/api', apiRoutes)

getAllByRange('price', '90000')

const port = process.env.PORT;
const server = app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = server