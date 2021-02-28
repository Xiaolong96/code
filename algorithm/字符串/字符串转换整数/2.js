/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function (str) {
  const news = str.trim();
  const int = parseInt(news);
  if (int) {
    return Math.max(Math.min(2 ** 31 - 1, int), -(2 ** 31));
  } else {
    return 0;
  }
};
