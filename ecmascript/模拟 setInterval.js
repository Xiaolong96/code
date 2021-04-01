/**
 * setInterval 的缺点：
 * 使用 setInterval 时，某些间隔会被跳过；
 * 可能多个定时器会连续执行；
 */

function _setInterval(callback, wait) {
  let timer = null;
  let fn = () => {
    callback();
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
  timer = setTimeout(fn, wait);
  return () => {
    clearTimeout(timer); // 或者把 timer 定义在函数外边也可以
  };
}

const _clearInterval = _setInterval(() => {
  console.log(1);
}, 1000);

setTimeout(() => {
  _clearInterval();
}, 5000);
