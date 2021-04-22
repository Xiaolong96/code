#### 1、React 逻辑复用的方案？

<details>
<summary>查看解析</summary>

##### Mixin

缺点：

- 引入隐式依赖（组件和 mixin）
- 导致名称冲突
- mixin 相互依赖，相互耦合导致滚雪球的复杂性

[Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

> React 是学院派前端库，怎么会喜欢 mixin 这种引入大量不可控因素的方式，导致新人上手代码时对其如何工作越发不理解(incomprehensible)。跟 PHP 里面的 traits 一样，mixin 一开始为了减少重复代码，隐藏累赘或复杂逻辑，特别受老人新人欢迎。可是他们跟 oop 设计模式几乎相反，对于大工程协作来说是有一点风险的。举个例子，烦人的 OOP 如果给你一个对象 Cat，工程师 A 想要写波斯猫，可以写个 PersianCat；工程师 B 写出了个 WildCat，只要约定不直接改 Cat，那么他们的修改基本互不影响。但是 mixin(PHP 里面的 trait)，写一个 PersianCat[mixin Cat + Persian]，或写一个 WildCat[mixin Cat + Wild]，是没有问题的。当写一个 野生波斯猫，可以非常方便写出 PersianWildCat[mixin Cat + Persian + Wild]。可是谁知道这只野生波斯猫的某个行为来自哪个 mixin，修着修着 bug 就不小心 override 了另一个不想改的行为了。（如果是上面的 OOP，那么野生波斯猫就必须在波斯猫和野生猫选一个继承啦，麻烦但是比较安全)HOC 也只是另一种隐藏累赘或复杂逻辑、减少重复代码的方式，但如此显性的行为当然是比较学院派的特性啦。 —— [知乎](zhihu.com/question/67588479)

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
