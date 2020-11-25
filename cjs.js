var __defineProperty = Object.defineProperty;
var __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defineProperty(target, name, {get: all[name], enumerable: true});
};

// index.js
__export(exports, {
  extractPlaceholders: () => extractPlaceholders,
  getExtractor: () => getExtractor,
  getReplacer: () => getReplacer,
  replace: () => replace,
  replaceExpress: () => replaceExpress
});
const getReplacer = (pattern) => {
  return function(str = "", ...maps) {
    if (!str) {
      return "";
    }
    const params = maps.reverse().reduce((acc, map) => ({...acc, ...map}));
    return str.replace(pattern, function(term, key) {
      return params[key] !== void 0 ? params[key] : term;
    });
  };
};
const getExtractor = (pattern) => {
  return function(str) {
    if (!str) {
      return [];
    }
    let match;
    let result = [];
    while (match = pattern.exec(str)) {
      result.push(match[1]);
    }
    return result;
  };
};
const replace = getReplacer(/{([^{}]+)}/gmi);
const extractPlaceholders = getExtractor(/{([^{}]+)}/gmi);
const replaceExpress = getReplacer(/:(\w+)/g);
