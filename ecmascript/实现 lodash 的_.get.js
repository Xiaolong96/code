/**
 * 在 js 中经常会出现嵌套调用这种情况，如 a.b.c.d.e，但是这么写很容易抛出异常。
 * 你需要这么写 a && a.b && a.b.c && a.b.c.d && a.b.c.d.e，但是显得有些啰嗦与冗长了。
 * 特别是在 graphql 中，这种嵌套调用更是难以避免。
 * 这时就需要一个 get 函数，使用 get(a, 'b.c.d.e') 简单清晰，并且容错性提高了很多。
 */

function get(target, path, defaultValue) {
  let keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  return keys.reduce((t, key) => (t || {})[key], target) ?? defaultValue;
}

/* test
---------------------------------------------------------------- */

let obj = {
  a: [
    {
      b: {
        c: { d: [2] },
      },
    },
  ],
};

console.log(get(obj, "a[0].b.c.d[0]", 1)); // output: 2
