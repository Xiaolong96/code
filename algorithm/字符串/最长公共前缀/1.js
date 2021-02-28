/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) {
    return "";
  }

  let i = 0;
  let flag = true;
  while (flag) {
    if (strs[0].length > i) {
      const char = strs[0].charAt(i);
      for (let j = 1; j < strs.length; j++) {
        if (strs[j].length <= i || char !== strs[j].charAt(i)) {
          flag = false;
          break;
        }
      }
    } else {
      flag = false;
    }
    i++;
  }
  return strs[0].substring(0, i - 1);
};
