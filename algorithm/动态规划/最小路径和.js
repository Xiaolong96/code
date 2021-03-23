// https://leetcode-cn.com/problems/minimum-path-sum/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let rowLen = grid.length;
  let colLen = grid[0].length;
  let dp = Array(rowLen)
    .fill(null)
    .map(() => {
      return Array(colLen).fill(Infinity);
    });
  dp[0][0] = grid[0][0];
  for (let i = 1; i < colLen; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i];
  }
  for (let i = 1; i < rowLen; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  for (let r = 1; r < rowLen; r++) {
    for (let c = 1; c < colLen; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
    }
  }
  return dp[rowLen - 1][colLen - 1];
};

// 优化：复用dp

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum1 = function (grid) {
  let row = grid.length,
    col = grid[0].length;

  // calc boundary
  for (let i = 1; i < row; i++)
    // calc first col
    grid[i][0] += grid[i - 1][0];

  for (let j = 1; j < col; j++)
    // calc first row
    grid[0][j] += grid[0][j - 1];

  for (let i = 1; i < row; i++)
    for (let j = 1; j < col; j++)
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);

  return grid[row - 1][col - 1];
};
