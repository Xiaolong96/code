/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function (strs) {
  function findCommonPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) {
      i++;
    }
    return i > 0 ? a.substring(0, i) : "";
  }
  if (strs.length > 0) {
    let commonPrefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      commonPrefix = findCommonPrefix(commonPrefix, strs[i]);
    }
    return commonPrefix;
  }
  return "";
};
