const memorizedList = [];
let cursor = 0;

/**
 * 直接取出依赖对比就行了，别忘了保存新的依赖
 * @param {*} callback
 * @param {*} deps
 */
function useEffect(callback, deps) {
  const prevDeps = memorizedList[cursor];
  const hasChanged = prevDeps
    ? !deps.every((item, index) => item === prevDeps[index])
    : true;
  if (!deps || hasChanged) {
    callback();
  }
  memorizedList[cursor++] = deps;
}
