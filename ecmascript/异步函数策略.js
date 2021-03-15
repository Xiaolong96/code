/**
 * @description 实现 sleep()
 * @param {number} delay
 */
async function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/* 利用平行执行加速
---------------------------------------------------------------- */

async function randomDelay(id) {
  // 延迟 0~1000 毫秒
  const delay = Math.random() * 1000;
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`${id} finished`);
      resolve();
    }, delay)
  );
}

async function foo() {
  const t0 = Date.now();
  for (let i = 0; i < 5; ++i) {
    await randomDelay(i);
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

// 如果顺序不是必需保证的，那么可以先一次性初始化所有 promise，然后再分别等待它们的结果

async function foo1() {
  const t0 = Date.now();
  const promises = Array(5)
    .fill(null)
    .map((_, i) => randomDelay(i));
  for (const p of promises) {
    await p;
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo1();
