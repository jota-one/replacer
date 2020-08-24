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
  getReplacer: () => getReplacer,
  replace: () => replace,
  replaceExpress: () => replaceExpress
});
const getReplacer = (pattern, extractionCb) => {
  return function(str = "", ...maps) {
    if (!str) {
      return "";
    }
    return str.replace(pattern, function(term) {
      const key = extractionCb(term);
      return maps[key] !== void 0 ? maps[key] : term;
    });
  };
};
const replace = getReplacer(/{([^{}]+)}/gmi, (term) => term.substring(1).slice(0, -1));
const replaceExpress = getReplacer(/:\w+/g, (term) => term.substring(1));
