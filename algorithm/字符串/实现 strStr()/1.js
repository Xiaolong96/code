/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const hayLen = haystack.length;
  const nedLen = needle.length;
  if (needle === "" || haystack === needle) {
    return 0;
  } else if (hayLen < nedLen) {
    return -1;
  } else {
    for (let i = 0; i <= hayLen - nedLen; i++) {
      if (haystack[i] !== needle[0]) {
        continue;
      }
      if (haystack.substr(i, nedLen) === needle) {
        return i;
      }
    }
    return -1;
  }
};
