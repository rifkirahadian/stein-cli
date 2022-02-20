const { getFishes } = require("../modules/Fish");

// exports.getAllByRange = async(key= null, value=null) => {
//   const params = {}
//   if (key !== null) {
//     params[key] = value
//   }
  
//   getFishes(params).then(data => {
//     console.log(data)
//   })
// }

exports.getAllByCommodity = (comodity) => {
  const fish = getFishes({ comodity }).then(data => {
    return data
  })

  return fish
}

exports.getById = (uuid) => {
  const fish = getFishes({ uuid }, { limit: 1 }).then(data => {
    return data.length > 0 ? data[0] : null
  })

  return fish
}