// https://leetcode-cn.com/problems/triangle/

/**
 * dp[i][j] = min(dp[i-1][j-1],dp[i-1][j]) + triangle[i][j]
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let len = triangle.length;
  let dp = Array(len)
    .fill(null)
    .map(() => {
      return Array(triangle[len - 1].length).fill(Infinity);
    });
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      if (j == triangle[i].length - 1) {
        dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
      } else if (j == 0) {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
      }
    }
  }
  let last = dp[len - 1];
  let min = last[0];
  for (let i = 1; i < last.length; i++) {
    min = Math.min(min, last[i]);
  }
  return min;
};

let triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
console.info("🎈 %c[flag]\n", "color: #1890ff;", minimumTotal(triangle));
