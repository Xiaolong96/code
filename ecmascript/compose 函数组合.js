/**
 * @description 把任意多个函数作为处理程序合成一个连续传值的期约连锁
 * @param  {...any} fns
 */
function compose(...fns) {
  return (x) =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
}

/* test
---------------------------------------------------------------- */

function addTwo(x) {
  return x + 2;
}
function addThree(x) {
  return x + 3;
}
function addFive(x) {
  return x + 5;
}

let addTen = compose(addTwo, addThree, addFive);
addTen(8).then(console.log); // 18
