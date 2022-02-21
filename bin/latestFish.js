#! /usr/bin/env node

const { getLatestFish } = require("../controllers/FishController");

getLatestFish().then(response => {
  console.log(response)
})