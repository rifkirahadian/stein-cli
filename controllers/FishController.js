const { getFishes } = require("../modules/Fish");

exports.getAllByCommodity = async(comodity) => {
  const params = {}
  if (key !== null) {
    params[key] = value
  }
  
  getFishes(params).then(data => {
    console.log(data)
  })
}