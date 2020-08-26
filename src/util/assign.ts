import arg = require("arg")

const assign = function (object,...args) {
  let target = Object.assign({},object);
  for(const arg in args){
    target = _assign(target,arg)
  }
  return target;
}

const _assign = function (object,source) {
  let target = Object.assign({},object);
  Object.keys(target).forEach(key => {
    let val = source[key];
    if(_isObject(val)){
      target[key] = _assign(target[key],source[key])
    } else {
      source[key]&&(target[key] = source[key])
    }
  })
  return target;
}

const _isObject = function (val){
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export default assign;