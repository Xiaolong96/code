function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
var getName;

function getName() {
  console.log(5);
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
getName = function () {
  console.log(4);
};

// 访问函数上的静态属性
Foo.getName(); // 2

// 同名情况下，函数声明提升优先级要高于变量声明提升，且提升后该函数声明定义不会被提升后的同名变量声明所覆盖，但是会被后续顺序执行的同名变量赋值所覆盖
getName(); // 4

// Foo 执行返回 this，this 在函数执行的时候确定，指向 window，注意函数执行时，函数里面的 getName 变量没有用 var 声明，隐式声明了全局变量并覆盖原方法
Foo().getName(); // 1

// 已经被覆盖
getName(); // 1

// 点的优先级高于 new，相当于 new (Foo.getName)(),
new Foo.getName(); // 2

// new 有参数列表的优先级和点相同，从左到右边执行，执行原型上的方法
new Foo().getName(); // 3

// new (new Foo().getName)()
new new Foo().getName(); // 3
