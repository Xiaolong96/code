/**
 * 前进的话：
 * 无论组件式还是编程式导航，最终都是调用状态管理api  pushState
 * 会改变浏览器 url 和 浏览记录但是不会重新加载页面
 * 然后根据url 动态匹配组件去渲染
 *
 * 后退的话：
 * 监听 popstate ，然后动态匹配组件
 *
 * 但是有一个问题，要确保通过pushState()创建的每个“假”URL背后 都对应着服务器上一个真实的物理 URL。否则，单击“刷新”按钮会导致 404 错误。
 */

import { BaseRouter } from "./base.js";
export class HistoryRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    // 监听历史栈变化，变化时候重新渲染页面
    window.addEventListener("popstate", (e) => {
      console.info("🎈 %c[popstate]\n", "color: #1890ff;");

      this.handler();
    });
  }
  // 渲染
  handler() {
    const state = this.getState();
    this.render(state);
  }
  // 获取路由路径
  getState() {
    const path = window.location.pathname;
    return path ? path : "/";
  }
  /*
   pushState方法实现压入功能，PushState不会触发popstate事件，
   因此我们需要手动调用handler函数
  */
  push(path) {
    window.history.pushState(null, null, path);
    this.handler();
  }
  /*
   pushState方法实现替换功能，replaceState不会触发popstate事件，
   因此我们需要手动调用handler函数
  */
  replace(path) {
    window.history.replaceState(null, null, path);
    this.handler();
  }
  go(num) {
    window.history.go(num);
  }
}
