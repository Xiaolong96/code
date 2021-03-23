/**
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 */

// 递归的DFS
let maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// 迭代的BFS
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let maxDepth1 = function (root) {
  if (!root) return 0;
  let max = 0;
  let queue = [root];

  while (queue.length) {
    max += 1;
    let len = queue.length;
    while (len--) {
      let node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return max;
};
