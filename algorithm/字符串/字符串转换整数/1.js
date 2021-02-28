/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function (str) {
  const matches = str.trim().match(/^(-|\+)?\d+/g);
  return matches
    ? Math.max(Math.min(2 ** 31 - 1, Number(matches[0])), -(2 ** 31))
    : 0;
};
