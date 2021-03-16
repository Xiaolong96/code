const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 2000));

/* 理解 generator
---------------------------------------------------------------- */

function* testG() {
  // ?await 被编译成了 yield
  const data = yield getData();
  console.log("1: ", data);
  const data2 = yield 2;
  console.log("2: ", data2);
  return "success";
}

// 返回了一个迭代器，此时并不会执行函数
var gen = testG();
// 第一次调用 next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数
const data = gen.next("000");
// !上一次让生成器函数暂停的 yield 关键字会接收到传给 next() 方法的第一个值
gen.next("111");
console.log(gen.next("222")); // { value: 'success', done: true }
data.value.then(console.log);

/* babel 编译的实现
---------------------------------------------------------------- */

async function fn() {
  const res = await "fn";
  return res;
}

// 转化第一步
function* fn2() {
  const res = yield "fn";
  return res;
}
// 第二步
const f = asyncToGenerator(fn2);
// 编译后的函数使用效果
f().then(console.log);

/**
 * @description babel编译async函数的核心，简化版，generate 也会被编译成更原始的代码
 * @param {*} generatorFunc async 标识的函数
 */
function asyncToGenerator(generatorFunc) {
  // 返回编译后的函数
  return function () {
    // 先调用generator函数 生成迭代器
    const gen = generatorFunc.apply(this, arguments);

    // async 函数的调用返回结果是一个 promise
    return new Promise((resolve, reject) => {
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      function step(key, arg) {
        let generatorResult;
        // throw 就把promise给reject掉
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          reject(error);
        }

        const { value, done } = generatorResult;

        if (done) {
          resolve(value);
        } else {
          // !重点
          return Promise.resolve(value).then(
            (v) => {
              step("next", v);
            },
            (e) => {
              step("throw", e);
            }
          );
        }
      }
      step("next");
    });
  };
}
