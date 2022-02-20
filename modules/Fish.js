const SteinStore = require("stein-js-client")
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