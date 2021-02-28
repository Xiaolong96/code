/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => {
  return s.split("").sort().join("") === t.split("").sort().join("");
};
