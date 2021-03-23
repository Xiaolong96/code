/*
 *有下边这样的dom结构，现在可以获取到ul，要求翻转里边li标签，如何处理更优
 * <ul>
 *  <li>1</li>
 *  <li>2</li>
 *  <li>3</li>
 * </ul>
 */

// 使用文档片段
function reverseChildNodes(node = document) {
  const frag = node.ownerDocument.createDocumentFragment();
  while (node.lastChild) {
    // 每次取出最后一个子节点也会将该节点从源节点中移除,并且更新lastChild
    frag.appendChild(node.lastChild);
  }
  // 将文档碎片直接插入到node节点下
  node.appendChild(frag);
}
const oUl = document.getElementById("root");
reverseChildNodes(oUl);
