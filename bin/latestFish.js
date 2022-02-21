#! /usr/bin/env node

const { getLatestFish } = require("../controllers/FishController");
const { priceConvertedFishes } = require("../modules/Fish");

getLatestFish().then(response => {
  priceConvertedFishes(response).then(data => {
    console.log(data)
  })
})