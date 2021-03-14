const memorizedList = []; // 记忆单元格列表
let cursor = 0;

function useState(initialState) {
  memorizedList[cursor] = memorizedList[cursor] ?? initialState;
  const curCursor = cursor; // 利用闭包保存单元格下标
  function setState(state) {
    memorizedList[curCursor] = state;
    // render
  }
  return [memorizedList[cursor++], setState];
}
