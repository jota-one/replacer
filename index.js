export const getResolver = (pattern, extractionCb) => {
  return function (str = '', params = {}) {
    if (!str) {
      return ''
    }

    return str.replace(pattern, function (term) {
      const key = extractionCb(term)
      return params[key] !== undefined ? params[key] : term
    })
  }
}

export default {
  resolve: getResolver(/{([^{}]+)}/gmi, term => term.substring(1).slice(0, -1)),
  resolveExpress: getResolver(/:\w+/g, term => term.substring(1))
}
