const SteinStore = require("stein-js-client")
const Fish = require("../models/Fish")
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

exports.fishRequiredValidate = (payload) => {
  const fish = Fish
  const notExist = []
  fish.forEach(item => {
    if (!Object.hasOwnProperty.call(payload, item)) {
      notExist.push(item)
    }
  })

  return notExist
}

exports.cityAreaValidate = (city) => {
  store.append("", [
    {
      komoditas: "Ikan Cumi",
      area_provinsi: "Bali",
      area_kota: "Aceh Kota",
      size: "40",
      price: "30000",
      tgl_parsed: new Date(),
      timestamp: new Date().getTime()
    }
  ])
}