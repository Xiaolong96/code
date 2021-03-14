/**
 * 装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
 * 
 * AOP思想:
​	* 先了解一下火于后端的一个编程思想：AOP( Aspect Oriented Programming ：面向切面编程)。 
 * 也叫做面向方法编程，是通过预编译方式和运行期动态代理的方式实现不修改源代码的情况下给程序动态统一添加功能的技术。
 * AOP面对业务处理过程中的某个步骤或阶段，降低业务流程步骤间的耦合度；
 * 与业务无关，被多个业务模块共同调用的逻辑可定义为一个Aspect切面
 * AOP是OOP（封装、继承，多态）的补充和完善，AOP实现分散关注点；
 * AOP是典型的代理模式体现；
 * 应用场景包括日志记录、性能统计、安全控制、事务处理、异常处理等。
 * 
 * 场景：防抖、截流、绑定this、异常处理
 */

// https://es6.ruanyifeng.com/#docs/decorator

// 类的装饰器
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A; // 类似高阶函数

// 方法的装饰

/**
 *
 * @param {*} target 类的原型对象
 * @param {*} name 要装饰的属性名
 * @param {*} descriptor 该属性的描述对象
 */
function readonly(target, name, descriptor) {
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor; // 返回描述符对象重新定义属性
}

class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}

/******** 异常处理 **********/

// 装饰器工厂
const showTipDecoratorBuilder = (errorHandler) => (
  target,
  name,
  descriptor
) => {
  const func = descriptor.value;
  return {
    get() {
      return (...args) => {
        return Promise.resolve(func.apply(this, args)).catch((error) => {
          errorHandler && errorHandler(error);
        });
      };
    },
    set(newValue) {
      return newValue;
    },
  };
};

// 装饰器
const showTipDecorator = showTipDecoratorBuilder((error) => {
  console.log(`Decorator error 消息提示 : ${error.message}`);
});

class PageAPI {
  @showTipDecorator
  successAPI() {
    return promiseAPIBuilder(0);
  }
  @showTipDecorator
  error404API() {
    return promiseAPIBuilder(404);
  }
  errorWithoutCatchAPI() {
    return promiseAPIBuilder(500);
  }
}
const api = new PageAPI();

const successAPI = async () => {
  const res = await api.successAPI(); // error 没有 catch
  if (!res) return;
  console.log("接口调用成功后的逻辑1");
};
successAPI();

const error404API = async () => {
  const res = await api.error404API(); // error 没有 catch
  if (!res) return;
  console.log("接口调用成功后的逻辑2");
};
error404API();

const errorWithoutCatchAPI = async () => {
  const res = await api.errorWithoutCatchAPI(); // error 没有 catch
  if (!res) return;
  console.log("接口调用成功后的逻辑3");
};
errorWithoutCatchAPI();
