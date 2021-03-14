/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  var _coinChange = function (coins, amount) {
    // 0 元只要0枚硬币
    if (amount === 0) return 0;
    // 求最小，初始化用无穷大
    let res = Infinity;

    for (let i = 0; i < coins.length; i++) {
      if (amount >= coins[i]) {
        res = Math.min(_coinChange(coins, amount - coins[i]) + 1, res);
      }
    }
    return res;
  };
  const res = _coinChange(coins, amount);
  if (res === Infinity) {
    return -1;
  }
  return res;
};
