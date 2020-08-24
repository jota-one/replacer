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

export const replace = getReplacer(/{([^{}]+)}/gmi)
export const replaceExpress = getReplacer(/:(\w+)/g)
