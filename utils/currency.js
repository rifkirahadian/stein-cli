const { default: axios } = require("axios");
const NodeCache = require("node-cache")
require('dotenv').config();

const myCache = new NodeCache();

exports.IDRtoUSD = async () => {
  const response = axios
      .get(`https://free.currconv.com/api/v7/convert?q=IDR_USD&compact=ultra&apiKey=${process.env.CURRCONV_API_KEY}`)
      .then((res) => { return res.data.IDR_USD })
      .catch((error) => {
        throw new Error(error.message)
      })

    return response
}

exports.setUSDValueCache = (usdValue) => {
  myCache.set('usdValue', usdValue, 30000)
}

exports.getUSDValue = () => {
  let usdValue = myCache.get('usdValue')
  if (usdValue) {
    return usdValue
  } 

  const usd = this.IDRtoUSD().then(data => {
    this.setUSDValueCache(data)

    return data
  })

  return usd
}