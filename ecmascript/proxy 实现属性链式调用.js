var pipe = function (value) {
  let stack = [];
  let proxy = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (prop === "get") {
          return stack.reduce((x, fn) => {
            return fn(x);
          }, value);
        }
        stack.push(window[prop]);
        // !链式调用的关键是返回本身
        return proxy;
      },
    }
  );
  return proxy;
};

var double = (n) => n * 2;
var pow = (n) => n * n;
var reverseInt = (n) => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

// 使用ES6 的Proxy实现数组负索引访问
const proxyArray = (arr) => {
  const length = arr.length;
  return new Proxy(arr, {
    get(target, key) {
      key = +key;
      // !注意负索引边界处理
      while (key < 0) {
        key += length;
      }
      return target[key];
    },
  });
};
var a = proxyArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(a[1]); // 2
console.log(a[-10]); // 9
console.log(a[-20]); // 8
