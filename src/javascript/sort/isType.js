
function isObject(obj) {
  return obj === Object(obj);
}
function isString(obj) {
  return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}
function isBoolean(obj) {
  return obj === true || obj === false;
}
function isNumber(obj) {
  return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}
function isNull(obj) {
  return obj === null;
}
function isUndefined(obj) {
  return obj === void 0;
}

['Arguments', 'Array', 'String'].forEach(function (name) {
    this['is' + name] = function (obj) {
        return toString.call(obj) === '[object ' + name + ']';
    }
});
function isArrayLike(obj) { 
    if (typeof(obj) == 'array') return true;
    return( !!obj && (typeof(obj) === 'object') && (typeof(obj.length) != 'undefined') ); 
}
function isEmpty(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (isArray(obj) || isString(obj) || isArguments(obj))) return obj.length === 0;
    return Object.keys(obj).length === 0;
};

function isType(arg){
  if(isObject(arg)){
    typeSwitch('object');
  }
  if(isBoolean(arg)){
    typeSwitch('boolean');
  }
  if(isString(arg)){        
    typeSwitch('string');
  }
  if(isNumber(arg)){    
    typeSwitch('number');
  }    
  if(isNull(arg)){
    typeSwitch('null');
  }
  if(isUndefined(arg)){
    typeSwitch('undefined');
  }
}
  
function typeSwitch(type){
    switch (type) {
      case "object":
        break;
      case "boolean":
        break;
      case "string":
        break;
      case "number":
        break;
      case "null":
        break;
      case "undefined":
        break;    
      default:
        break;
    } 
}
