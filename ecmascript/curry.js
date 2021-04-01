/**
 * 柯里化其实是函数式编程的一个过程，在这个过程中我们能把一个带有多个参数的函数转换成一系列的嵌套函数。
 * 它返回一个新函数，这个新函数期望传入下一个参数。
 * 它不断地返回新函数（像我们之前讲的，这个新函数期望当前的参数），直到所有的参数都被使用。
 * 参数会一直保持 alive（通过闭包），当柯里化函数链中最后一个函数被返回和调用的时候，它们会用于执行。
 * 柯里化是一个把具有较多 arity（函数的参数数量）的函数转换成具有较少 arity 函数的过程
 */

/* 固定参数版
---------------------------------------------------------------- */

/**
 * curry function
 * @param {Function} func The function to curry.
 */
var curry = function (fn) {
  return function t(...args) {
    // 递归出口，传递参数总数到达 fn 的参数个数，返回函数执行结果
    if (args.length >= fn.length) {
      return fn.apply(undefined, args);
    }

    return function (...innerArgs) {
      const allArgs = args.concat(innerArgs);
      return t.apply(undefined, allArgs);
    };
  };
};

/* 不定参数版
---------------------------------------------------------------- */

var curry1 = function (fn) {
  let preArgsLen = 0;
  return function t(...args) {
    if (args.length === preArgsLen) {
      preArgsLen = 0; // 保证再次调用时清空
      return fn.apply(undefined, args);
    }
    // 记录上次调用的参数总长度，如果下一次调用长度没变，则结束 curry
    preArgsLen = args.length;
    return function (...innerArgs) {
      const allArgs = args.concat(innerArgs);
      return t.apply(undefined, allArgs);
    };
  };
};

// 优化实现
var curry2 = function (fn) {
  let args = [];
  return function t(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return t;
    }
    let res = fn(...args);
    // ! 保证再次调用时清空
    args = [];
    return res;
  };
};

/* test
---------------------------------------------------------------- */

// 固定长度
function add(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}

var curriedAdd = curry(add);
const res = curriedAdd(2)(3)(1)(4); // 10
console.log(res);

// 不定长度
function add2(...args) {
  return args.reduce((acc, num) => {
    return acc + num;
  }, 0);
}
var curriedAdd2 = curry2(add2);
const res1 = curriedAdd2(2)(3)(1)(4)(5)(5, 4)(); // 24
console.log(curriedAdd2(6)());
