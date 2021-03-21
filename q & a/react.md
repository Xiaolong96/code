#### 1、React 逻辑复用的方案？

<details>
<summary>查看解析</summary>

##### Mixin

缺点：

- 引入隐式依赖（组件和 mixin）
- 导致名称冲突
- mixin 相互依赖，相互耦合导致滚雪球的复杂性

[Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

##### HOC

高阶组件的实现方式：

- 属性代理
  函数返回一个我们自己定义的组件，然后在 render 中返回要包裹的组件，这样我们就可以代理所有传入的 props，并且决定如何渲染，实际上 ，这种方式生成的高阶组件就是原组件的父组件，上面的函数 visible 就是一个 HOC 属性代理的实现方式。

  ```JS
  function proxyHOC(WrappedComponent) {
    return class extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  }
  ```

  对比原生组件增强的项：

  - 可操作所有传入的 props
  - 可操作组件的生命周期
  - 可操作组件的 static 方法
  - 获取 refs

- 反向继承
  返回一个组件，继承原组件，在 render 中调用原组件的 render。由于继承了原组件，能通过 this 访问到原组件的生命周期、props、state、render 等，相比属性代理它能操作更多的属性。

  ```JS
  function inheritHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
  }
  ```

  相比属性代理，还可以有两个优势：

  - 可操作 state
  - 可以**渲染劫持**

HOC 可以实现什么功能？

组合渲染、条件渲染、操作 props、获取 refs、渲染劫持等

如何使用 HOC?
compose、Decorators

HOC 的缺点

- HOC 需要在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这让调试变得非常困难。
- HOC 可以劫持 props，在不遵守约定的情况下也可能造成冲突。

参考：
[从 Mixin 到 HOC 再到 Hook](https://juejin.cn/post/6844903815762673671#heading-1)

##### Hook

动机：
Hook 使你在**无需修改组件结构**的情况下复用状态逻辑
解决了 mixin 和 HOC 的问题

</details>
