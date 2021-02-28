/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const MIN = -(2 ** 31);
  const MAX = 2 ** 31;
  let int = Math.abs(x);
  let sum = 0;

  // 遍历循环生成每一位数字
  while (int !== 0) {
    // 借鉴欧几里得算法，从 num 的最后一位开始取值拼成新的数
    sum = (int % 10) + sum * 10;
    // 剔除掉被消费的部分
    int = Math.floor(int / 10);
  }

  sum = x > 0 ? sum : 0 - sum;
  // 异常值
  if (sum > MAX || sum < MIN) {
    return 0;
  }
  return sum;
};

console.log(reverse(-123));
