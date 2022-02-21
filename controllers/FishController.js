const { DateTime } = require("luxon");
const { v4 } = require("uuid");
const { getFishes, getAreas, getSizes, addFish, updateFish, deleteFish } = require("../modules/Fish");

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

exports.getMaxPriceByWeek = (week) => {
  const fish = getFishes({ }, { limit: null }).then(data => {
    let maxPrice = 0
    
    data.forEach(item => {
      const { tgl_parsed, price } = item
      if (tgl_parsed && price) {
        const weekNumber = DateTime.fromISO(tgl_parsed).weekNumber

        if ((weekNumber === week) && (parseInt(price) > maxPrice)) {
          maxPrice = parseInt(price)
        }
      }
    })

    return maxPrice
  })

  return fish
}

exports.addRecords = (payload) => {
  const { city, size, commodity, price, parsedDate } = payload
  const area = getAreas({ city }).then(data => {
    return data
  })

  const sizes = getSizes({ size }).then(data => {
    return data
  })

  const response = Promise.all([area, sizes]).then(values => {
    if (values[0].length === 0) {
      return {
        success: false,
        message: 'City not found'
      }
    }

    if (values[1].length === 0) {
      return {
        success: false,
        message: 'Size not found'
      }
    }

    const fish = addFish({
      uuid: v4(),
      area_provinsi: values[0][0].province,
      area_kota: values[0][0].city,
      komoditas: commodity,
      size: values[1][0].size,
      price,
      tgl_parsed: DateTime.fromSQL(parsedDate)
    }).then(data => {
      return data
    })

    return fish
  })

  return response
}

exports.updateRecords = (uuid, payload) => {
  const { city, size, commodity, price, parsedDate } = payload

  const fish = getFishes({ uuid }, { limit: 1 }).then(data => {
   return data
  })
  
  const area = getAreas({ city }).then(data => {
    return data
  })

  const sizes = getSizes({ size }).then(data => {
    return data
  })

  const response = Promise.all([area, sizes, fish]).then(values => {
    if (values[0].length === 0) {
      return {
        success: false,
        message: 'City not found'
      }
    }

    if (values[1].length === 0) {
      return {
        success: false,
        message: 'Size not found'
      }
    }

    if (values[2].length === 0) {
      return {
        success: false,
        message: 'Fish not found'
      }
    }

    const fishUpdate = updateFish(uuid, {
      area_provinsi: values[0][0].province,
      area_kota: values[0][0].city,
      komoditas: commodity,
      size: values[1][0].size,
      price,
      tgl_parsed: DateTime.fromSQL(parsedDate)
    }).then(data => {
      return data
    })

    return fishUpdate
  })

  return response
}

exports.deleteRecords = (uuid) => {
  const response = getFishes({ uuid }, { limit: 1 }).then(fish => {
    if (fish.length === 0) {
      return {
        success: false,
        message: 'Fish not found'
      }
    }

    const fishDelete = deleteFish(uuid).then(response => {
      return response
    })

    return fishDelete
  })

  return response
}

exports.getMostRecordsByCommodity = () => {
  const fish = getFishes({ }, { limit: null }).then(data => {
    const commodities = {}
    data.forEach(item => {
      const { komoditas } = item
      if (komoditas) {
        if (!Object.hasOwnProperty.call(commodities, komoditas)) {
          commodities[komoditas] = 0
        }

        commodities[komoditas] += 1
      }
    })

    return commodities
  })

  return fish
}