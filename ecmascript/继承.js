/**
 * 寄生式组合继承——引用类型继承的最佳模式
 * 1、利用盗用构造函数继承基类的属性
 * 2、利用寄生式继承（原型式继承增强）连接原型，共享方法
 */

/**
 * 寄生式原型继承
 * @param {*} derivedType 派生类
 * @param {*} baseType 基类
 */
function inheritPrototype(derivedType, baseType) {
  let prototype = Object.create(baseType.prototype); // 创建原型对象（原型式继承）
  prototype.constructor = baseType; // 增强原型对象
  derivedType.prototype = prototype; // 赋值原型对象
}

// 基类
function Base() {
  this.name = "Base";
}

// 派生类
function Derived() {
  Base.call(this); // 盗用构造函数继承
  this.age = 18;
}

inheritPrototype(Derived, Base);

/** --------test-------- */

Base.prototype.sayName = function () {
  console.log(this.name);
};
Derived.prototype.sayAge = function () {
  console.log(this.age);
};
const test = new Derived();
test.sayName();
test.sayAge();

/**
 * 总结：
 *
 * 创建对象的三种方式：
 * 1、工厂模式
 * 2、构造函数模式
 * 3、原型模式
 *
 * 继承：
 * 1、原型链继承：引用类型属性被实例共享；无法在派生类调用是给基类传参数
 * 2、盗用构造函数继承：方法无法被实例共享
 * 3、组合继承：基类被调用两次；new Base 的过程导致派生类原型中多了无用的基类属性
 * 4、原型式继承：适用于在已有对象的基础上再创建一个新对象，而且也有引用类型属性被新对象共享的问题
 * 5、寄生式继承：在原型式继承创建的新对象上增加属性或方法（增强对象），也类似与工厂模式
 * 6、寄生式组合继承：最佳模式
 */
