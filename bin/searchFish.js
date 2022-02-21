#! /usr/bin/env node

const yargs = require("yargs");
const { getAllByCommodity, getByArea, getAllByPriceRange } = require("../controllers/FishController");

if (yargs.argv._.length === 2) {
  switch (yargs.argv._[0]) {
    case 'commodity':
        getAllByCommodity(yargs.argv._[1]).then(response => {
          console.log(response)
        })
      break;
    
    case 'area':
        getByArea(yargs.argv._[1].toUpperCase()).then(response => {
          console.log(response)
        })
      break;
    
    case 'price-range':
        const parsePrice = yargs.argv._[1].split('-')
        getAllByPriceRange(parsePrice[0], parsePrice[1]).then(response => {
          console.log(response)
        })
      break;

    default:
      console.log('Invalid parameters')
      break;
  }
} else {
  console.log('Invalid parameters')
}

