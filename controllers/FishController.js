const { DateTime } = require("luxon");
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

exports.getAllByDateRange = async(min, max) => {
  const fish = getFishes({}, { limit: null }).then(data => {
    const selectedFish = []
    const minDate = DateTime.fromSQL(`${min} 00:00:00`)
    const maxDate = DateTime.fromSQL(`${max} 23:59:59`)

    data.forEach(item => {
      const { tgl_parsed } = item
      if (tgl_parsed) {
        const dateParsed = DateTime.fromISO(tgl_parsed)

        if ((dateParsed >= minDate) && (dateParsed <= maxDate)) {
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

exports.getMaxPriceByCommodity = (commodity) => {
  const fish = getFishes({ komoditas: commodity }, { limit: null }).then(data => {
    let maxPrice = 0
    
    data.forEach(item => {
      const { price } = item
      if (price) {
        if (parseInt(price) > maxPrice) {
          maxPrice = parseInt(price)
        }
      }
    })

    return maxPrice
  })

  return fish
}