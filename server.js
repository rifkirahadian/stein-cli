require('dotenv').config();

const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const { getAllByRange, getById, getByArea } = require('./controllers/FishController');

app.use(bodyParser.json());

//route list
const apiRoutes = express.Router()

app.use('/api', apiRoutes)

// getAllByRange('price', '90000')
// getById('cd83ea51-ef20-4778-9d32-6504d6900c39').then(data => {
//   console.log(data)
// })
// getByArea('province', 'JAWA BARAT').then(data => {
//   console.log(data)
// })

const port = process.env.PORT;
const server = app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = server