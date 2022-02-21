const SteinStore = require("stein-js-client")
const Fish = require("../models/Fish")
const { getUSDValue } = require("../utils/currency")
const list = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list"

exports.getFishes = (search={}, addParams={}) => {
  const store = new SteinStore(list)

  const params = { limit: 10, search }
  for (const key in addParams) {
    params[key] = addParams[key]
  }
  
  return store.read("", params).then(data => {
    return data
  })
}

exports.getAreas = (search) => {
  const store = new SteinStore('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area')
  
  return store.read("", { search }).then(data => {
    return data
  })
}

exports.getSizes = (search) => {
  const store = new SteinStore('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size')
  
  return store.read("", { search }).then(data => {
    return data
  })
}

exports.addFish = (payload) => {
  const store = new SteinStore(list)

  const response = store.append('', [
    {
      ...payload,
      timestamp: new Date().getTime()
    }
  ]).then(res => {
    return res
  })

  return response
}

exports.updateFish = (uuid, payload) => {
  const store = new SteinStore(list)

  const response = store.edit('', {
    search: { uuid },
    set: { 
      ...payload,
      timestamp: new Date().getTime()
    }
  }).then(res => {
    return res
  })

  return response
}

exports.deleteFish = (uuid) => {
  const store = new SteinStore(list)

  const response = store.delete('', {
    search: { uuid }
  }).then(res => {
    return res
  })

  return response
}

exports.priceConvertedFishes = (list) => {
  const data = getUSDValue().then(usdValue => {
    return list.map(item => {
      item.usd_price = parseInt(item.price) * usdValue

      return item
    })
  })

  return data
}
