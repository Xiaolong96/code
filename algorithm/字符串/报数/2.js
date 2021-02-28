/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = function (n) {
  let result = "1"; // 第一个数为'1'
  for (let i = 1; i < n; i++) {
    // 循环获取知道第 n 项。
    // 同方法一
    result = result.replace(/(\d)\1*/g, (item) => `${item.length}${item[0]}`);
  }
  return result;
};
