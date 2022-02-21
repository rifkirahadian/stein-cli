require('dotenv').config();

const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const { 
  getAllByRange, getById, getByArea, getAllByPriceRange, getAllBySizeRange, getAllByDateRange, 
  getAllByCommodity, getMaxPriceByCommodity, getMaxPriceByWeek, addRecords, updateRecords, deleteRecords, getMostRecordsByCommodity 
} = require('./controllers/FishController');
const { deleteFish } = require('./modules/Fish');

app.use(bodyParser.json());

//route list
const apiRoutes = express.Router()

app.use('/api', apiRoutes)

// getAllByDateRange('2022-01-01', '2022-02-28').then(data => {
//   console.log(data)
// })

// getById('cd83ea51-ef20-4778-9d32-6504d6900c39').then(data => {
//   console.log(data)
// })

// getByArea('province', 'JAWA BARAT').then(data => {
//   console.log(data)
// })

// getMaxPriceByWeek(7).then(data => {
//   console.log(data)
// })

// addRecords({ 
//   city: 'BANDUNG', 
//   size: '30', 
//   parsedDate: '2020-01-01 10:10:10',
//   price: 30000,
//   commodity: 'Arwana'
// }).then(response => {
//   console.log(response)
// })

// updateRecords('385eaa89-d7fe-4590-b63c-348b9155dc39' , { 
//   city: 'ACEH KOTA', 
//   size: '30', 
//   parsedDate: '2020-01-01 10:10:10',
//   price: 30000,
//   commodity: 'Arwana'
// }).then(response => {
//   console.log(response)
// })

// deleteRecords('9fb62217-500b-498a-98b5-e47cb5b6f3d1').then(response => {
//   console.log(response)
// })

// getMostRecordsByCommodity().then(response => {
//   console.log(response)
// })

const port = process.env.PORT;
const server = app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = server