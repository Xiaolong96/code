let multiply = function (num1, num2) {
  //判断输入是不是数字
  if (isNaN(num1) || isNaN(num2)) return "";
  let len1 = num1.length,
    len2 = num2.length;
  let ans = [];

  //这里倒过来遍历很妙,不需要处理进位了
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      let index1 = i + j,
        index2 = i + j + 1;
      let mul = num1[i] * num2[j] + (ans[index2] || 0);
      ans[index1] = Math.floor(mul / 10) + (ans[index1] || 0);
      ans[index2] = mul % 10;
    }
  }

  //去掉前置0
  let result = ans.join("").replace(/^0+/, "");

  //不要转成数字判断，否则可能会超精度！
  return !result ? "0" : result;
};

console.info(
  "🎈 %c[flag]\n",
  "color: #1890ff;",
  multiply("4503599627370496", "4503599627370496")
);

// 图的话，需要记录已经访问过的点，这是因为图中可能存在环（树是一种特殊的图）
let visited = new Set();

function BFS(graph, start, end) {
  // 队列
  queue = [];
  queue.push(start);
  visited.add(start);

  while (queue.length !== 0) {
    // 出队
    node = queue.shift();
    visited.add(node);

    process(node);

    // 获取关联的其他 nodes
    nodes = generate_related_nodes(node);

    // 将相关联的 nodes 入队
    queue.push(nodes);
    // other processing work
  }
  // ...
}

// 递归
// 图的话，需要记录已经访问过的点，这是因为图中可能存在环（树是一种特殊的图）
let visited = new Set();

function dfs(node, visited) {
  // 终止条件，对于图 node 如果已经访问过了，终止，对于树，就是节点访问完了，也就是 node 不存在，就可以跳出了
  if (visited.has(node)) {
    // already visited
    return;
  }

  visited.add(node);
  // 处理当前节点
  // ...
  for (let i = 0; i < node.children.length; i++) {
    let next_node = node.children[i];
    if (!visited.has(next_node)) {
      // 如果该节点没有被访问过，进入下一层
      dfs(next_node, visited);
    }
  }
}

var levelOrder = function (root) {
  if (!root) return [];
  let map = new Map();

  function helper(level, root) {
    if (!root) return;

    map.has(level)
      ? map.set(level, [...map.get(level), root.val])
      : map.set(level, [root.val]);

    if (root.left) helper(level + 1, root.left);
    if (root.right) helper(level + 1, root.right);
  }

  helper(0, root);

  return Array.from(map.values());
};
