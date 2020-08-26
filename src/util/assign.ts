import arg = require("arg")

const assign = function (object,...args) {
  while(args.length > 0) {
    _assign(object,args.shift)
  }
  return object;
}

const _assign = function (object,source) {
    
}

export default assign;