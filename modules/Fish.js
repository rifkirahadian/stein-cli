const SteinStore = require("stein-js-client")

exports.getFishes = async(search={}, addParams={}) => {
  const store = new SteinStore(
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list"
  );

  const params = { limit: 10, offset: 0, search }
  for (const key in addParams) {
    params[key] = addParams[key]
  }
  
  return store.read("", params).then(data => {
    return data
  })
}