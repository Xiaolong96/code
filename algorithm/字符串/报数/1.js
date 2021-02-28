/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = function (n) {
  if (n === 1) {
    return "1";
  }
  const preResult = countAndSay(n - 1); // 获取第 n-1 项的结果。
  /**
   * \d 匹配一个数字
   * \1 匹配前面第一个括号内匹配到的内容
   * (\d)\1* 匹配相邻数字相同的内容
   * 使用replace方法将匹配到的内容处理为长度 + 内容的第一个字符
   * 结果为所求报数
   **/
  return preResult.replace(/(\d)\1*/g, (item) => `${item.length}${item[0]}`);
};

// const countAndSay = function (n) {
//   if (n === 1) {
//     return "1";
//   }

//   let ret = "";
//   let last = countAndSay(n - 1);

//   while (last !== "") {
//     let curChar = last.charAt(0);
//     const matches = last.match(new RegExp(`^[${curChar}]+`));
//     ret += matches[0].length + curChar;
//     last = last.slice(matches[0].length);
//   }

//   return ret;
// };

console.log(countAndSay(5));
