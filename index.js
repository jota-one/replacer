export const getReplacer = (pattern, extractionCb) => {
  return function (str = '', ...maps) {
    if (!str) {
      return ''
    }

    return str.replace(pattern, function (term) {
      const key = extractionCb(term)
      return maps[key] !== undefined ? maps[key] : term
    })
  }
}

export const replace = getReplacer(/{([^{}]+)}/gmi, term => term.substring(1).slice(0, -1))
export const replaceExpress = getReplacer(/:\w+/g, term => term.substring(1))
