Function.prototype.call = function (context, ...args) {
  // 兼容 context 为 null
  context = context || globalThis;
  context.fn = this;

  let ret = context.fn(...args);
  delete context.fn;
  return ret;
};

Function.prototype.apply = function (context, args) {
  // 兼容 context 为 null
  context = context || globalThis;
  context.fn = this;

  let ret = context.fn(...args);
  delete context.fn;
  return ret;
};

Function.prototype.bind = function (context, ...bindArgs) {
  context = context || globalThis;
  const fn = this;

  return function (...callArgs) {
    const args = bindArgs.concat(callArgs);
    if (this instanceof fn) {
      return new fn(...args);
    }
    return fn.call(context, ...args);
  };
};

var cxt = {
  a: 2,
};
var a = 1;
function logA() {
  console.log(this.a);
}

logA.call(cxt);
