// https://leetcode-cn.com/problems/minimum-falling-path-sum/

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  let rowLen = matrix.length;
  let colLen = matrix[0].length;
  let dp = Array(rowLen)
    .fill(null)
    .map(() => {
      return [];
    });
  for (let i = 0; i < colLen; i++) {
    dp[0][i] = matrix[0][i];
  }

  for (let i = 1; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      let left = dp[i - 1][j - 1] === undefined ? Infinity : dp[i - 1][j - 1];
      let middle = dp[i - 1][j] === undefined ? Infinity : dp[i - 1][j];
      let right = dp[i - 1][j + 1] === undefined ? Infinity : dp[i - 1][j + 1];
      dp[i][j] = Math.min(left, middle, right) + matrix[i][j];
    }
  }

  let last = dp[rowLen - 1];
  let ret = last[0];
  for (let i = 0; i < colLen; i++) {
    ret = Math.min(ret, last[i]);
  }
  console.info("🎈 %c[flag]\n", "color: #1890ff;", dp);

  return ret;
};

// 优化：在原数组上保存路径和，倒序遍历
var minFallingPathSum1 = function (matrix) {
  let len = matrix.length;

  for (let r = len - 2; r >= 0; r--) {
    for (let c = 0; c < len; c++) {
      let best = matrix[r + 1][c];
      if (c > 0) {
        best = Math.min(best, matrix[r + 1][c - 1]);
      }
      if (c < len - 1) {
        best = Math.min(best, matrix[r + 1][c + 1]);
      }
      matrix[r][c] += best;
    }
  }
  let ret = matrix[0][0];
  for (let i = 1; i < len; i++) {
    ret = Math.min(ret, matrix[0][i]);
  }
  return ret;
};

let matrix = [
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9],
];
console.info("🎈 %c[flag]\n", "color: #1890ff;", minFallingPathSum(matrix));
