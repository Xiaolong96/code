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
let sumNumbers = function (root) {
  let paths = [];

  let dfs = (node, path) => {
    if (!node) {
      return;
    }

    let newPath = `${path}${node.val}`;
    if (!node.left && !node.right) {
      paths.push(newPath);
      return;
    }

    dfs(node.left, newPath);
    dfs(node.right, newPath);
  };

  dfs(root, "");
  return paths.reduce((total, val) => {
    return total + Number(val);
  }, 0);
};
