const { getFishes } = require("../modules/Fish");

exports.getAllByCommodity = (comodity) => {
  const fish = getFishes({ comodity }).then(data => {
    return data
  })

  return fish
}

exports.getAllByPriceRange = async(min, max) => {
  const fish = getFishes({}, { limit: null }).then(data => {
    const selectedFish = []
    data.forEach(item => {
      const { price } = item
      if (price) {
        if ((parseInt(price) >= min) && (parseInt(price) <= max)) {
          selectedFish.push(item)
        }
      }
    })

    return selectedFish
  })

  return fish
}

exports.getAllBySizeRange = async(min, max) => {
  const fish = getFishes({}, { limit: null }).then(data => {
    const selectedFish = []
    data.forEach(item => {
      const { size } = item
      if (size) {
        if ((parseInt(size) >= min) && (parseInt(size) <= max)) {
          selectedFish.push(item)
        }
      }
    })

    return selectedFish
  })

  return fish
}

exports.getById = (uuid) => {
  const fish = getFishes({ uuid }, { limit: 1 }).then(data => {
    return data.length > 0 ? data[0] : null
  })

  return fish
}

exports.getByArea = (type, area) => {
  const search = {}
  switch (type) {
    case 'city':
      search['area_kota'] = area
      break;
    
    case 'province':
      search['area_provinsi'] = area
      break;
  
    default:
      break;
  }
  const fish = getFishes(search, { limit: 1 }).then(data => {
    return data.length > 0 ? data[0] : null
  })

  return fish
}