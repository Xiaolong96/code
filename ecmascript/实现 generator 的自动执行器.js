// 要求是 yield 后面只能是 Promise 或 Thunk 函数
function run(generatorFn) {
  let gen = generatorFn();

  function next(data) {
    let { value, done } = gen.next(data);
    if (done) return value;
    if (value instanceof Promise) {
      value.then((v) => {
        next(v);
      });
    } else {
      value(next);
    }
  }
  next();
}

/* test
---------------------------------------------------------------- */

function func(data, cb) {
  console.log(data);
  cb();
}

function* gen() {
  let a = yield Promise.resolve(1);
  console.log(a);
  let b = yield Promise.resolve(2);
  console.log(b);
  yield func.bind(null, a + b);
}

run(gen);
