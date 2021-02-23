function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("第一个参数必须是函数");
  }
  // 创建对象 并链接到函数原型
  const obj = Object.create(fn.prototype);
  // 改变 this 指向 并执行函数
  const ret = fn.call(obj, ...args);
  // 函数有返回值就把值返回
  if (ret !== null && (typeof ret === "object" || typeof ret === "function")) {
    return ret;
  }
  // 否则返回新对象
  return obj;
}

function Stu(name) {
  this.name = name;
}
Stu.prototype.getName = function () {
  console.log(this.name);
};

const s = _new(Stu, "xiaolong");
s.getName();
