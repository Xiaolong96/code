/**
 * 观察者模式
 * 1、Subject 需维护一套 Observer 的集合
 * 2、Observer 实现相同的接口
 * 3、Subject 调用 Observer 统一方法，直接通知 Observer
 *
 * 发布订阅模式（对注册和触发进行了解耦）
 * 发布者，并不会直接通知订阅者，而是通过 经纪人Broker
 */

/** 观察者模式：房地产商和购房者直接联系 */

class Subject {
  constructor() {
    this.observers = []; // 维护购房者花名册
  }

  attach(observer) {
    // 注册购房者花名册
    this.observers.push(observer);
  }
  notify() {
    // 通知购房者
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}

const observer = {
  update() {
    // 实现统一接口
    console.log("updated");
  },
};

const subject = new Subject(); // 房地产商

subject.attach(observer);

subject.notify();

/** 发布订阅模式：房地产商和购房者通过售楼中心交易 */

// broker or message broker or event bus 消息代理或事件总线
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    const callbacks = this.events[event] || [];
    if (Array.isArray(callbacks)) {
      callbacks.push(callback);
      this.events[event] = callbacks;
    }
    return this;
  }
  off(event, callback) {
    const callbacks = (this.events[event] || []).filter(
      (cb) => cb !== callback
    );
    this.events[event] = callbacks;
    return this;
  }
  once(event, callback) {
    const wrap = (...args) => {
      typeof callback === "function" && callback.apply(this, args);
      this.off(event, wrap);
    };
    this.on(event, wrap);
    return this;
  }
  emit(event) {
    const callbacks = this.events[event] || [];
    if (Array.isArray(callbacks)) {
      callbacks.forEach((cb) => typeof cb === "function" && cb());
    }
    return this;
  }
}

const e = new EventEmitter(); // 售楼中心

e.on("A", () => {
  // 购房者在售楼中心注册（订阅）
  console.log("A");
});
e.on("B", () => {
  // 购房者在售楼中心注册（订阅）
  console.log("B");
});

e.emit("A"); // 房地产商有房时通知售楼中心（发布）

/** 总结
 *
 * 什么是发布订阅，具体场景：
 * 1、登陆（或者请求）完成设置header 头部、nav 导航、消息列表、购物车等，一般是使用异步回调，
 * 但如果新加功能会导致修改原回调代码，可以在登陆完成 emit，然后功能动作自行订阅，将功能解耦出来；
 * 2、dom addEventListener
 *
 * 优点：
 * 发布订阅代替异步回调，耦合低
 * 缺点：
 * 过于灵活，逻辑不好梳理，不知道在哪里订阅的
 *
 * 观察者和发布订阅的区别：
 * 两种模式本质都是一样的，主要关键点都在于注册（添加到注册数组中）和触发（触发注册数组中的内容），
 * 只是订阅/发布模式对注册和触发进行了解耦；
 *
 * 观察者的场景：
 * vue 的 watch，没有消息中介，直接使用 defineProperty 访问器属性劫持每个 watch 的数据（注册），在 setter 方法里触发
 */
