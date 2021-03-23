/**
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
 * 也能用 DFS，但是显然 BFS 更优
 * @param {*} root
 */
let minDepth = function (root) {
  if (!root) return 0;

  let depth = 0;
  let queue = [root];

  while (queue.length) {
    depth++;
    let len = queue.length;
    while (len--) {
      let node = queue.shift();

      let left = node.left;
      let right = node.right;
      if (!left && !right) {
        return depth;
      }

      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
    }
  }
};
