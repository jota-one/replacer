export const getReplacer = (pattern) => {
  return function (str = '', ...maps) {
    if (!str) {
      return ''
    }
    const params = maps.reverse().reduce((acc, map) => ({ ...acc, ...map }))
    return str.replace(pattern, function (term, key) {
      return params[key] !== undefined ? params[key] : term
    })
  }
}

export const getExtractor = (pattern) => {
  return function (str) {
    if (!str) {
      return []
    }

    let match
    let result = []
    while (match = pattern.exec(str)) {
      result.push(match[1])
    }

    return result
  }
}

export const replace = getReplacer(/{([^{}]+)}/gmi)
export const extractPlaceholders = getExtractor(/{([^{}]+)}/gmi)
export const replaceExpress = getReplacer(/:(\w+)/g)
