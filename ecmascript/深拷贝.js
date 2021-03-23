/**
 * 浅拷贝只复制一层对象的属性，并不包括对象里面的为引用类型的属性值，因此修改拷贝后的属性值是引用类型的，就会影响源对象
 * 深拷贝就是对对象以及对象的所有子对象进行拷贝
 */

function cloneDeep(obj) {
  // 参数校验
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 获取obj的构造函数并实例化一个新的，兼容数组的情况
  const cloneObj = new obj.constructor();
  Object.keys(obj).forEach((key) => {
    // 递归拷贝属性
    cloneObj[key] = cloneDeep(obj[key]);
  });
  return cloneObj;
}

function cloneLoop(x) {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    for (let k in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

let x = [{ a: [{ b: 1 }] }];
let res = cloneDeep(x);
console.info("🎈 %c[flag]\n", "color: #1890ff;", JSON.stringify(res));
