#### 1、常见的前后端鉴权方式

<details>
<summary>查看解析</summary>

##### Session-Cookie

session 是另一种记录服务器和客户端会话状态的机制
session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的 cookie 中
SessionID 是连接 Cookie 和 Session 的一道桥梁

使用 Session 保持会话信息使用起来非常简单，技术也非常成熟。但是也存在下面的几个问题：

- 服务器压力大：通常 Session 是存储在内存中的，每个用户通过认证之后都会将 session 数据保存在服务器的内存中，而当用户量增大时，服务器的压力增大。
- Session 共享：现在很多应用都是分布式集群，需要我们做额外的操作进行 Session 共享；
- CSRF 跨站伪造请求攻击：Session 机制是基于浏览器端的 cookie 的，cookie 如果被截获，用户就会很容易受到跨站请求伪造的攻击。

##### Token 验证（包括 JWT，SSO）

什么是 Token（令牌）？

- `Access Token`: 访问资源接口（API）时所需要的资源凭证
- `Refresh Token`: refresh token 是专用于刷新 access token 的 token。

Access Token 的时效一般比较短，防止泄露，例如设置 Access Token 一周，Refresh Token 一个月

> refresh_token 意义在哪里？更安全吗？
> refresh_token 只能与授权服务器交换，而只能 access_token 与资源服务器交换。这样可以减轻“ access-token 长期泄漏”的风险

基于 token 的验证机制，有以下的优点：

- 支持跨域访问，将 token 置于请求头中，而 cookie 是不支持跨域访问的；
- 无状态化，服务端无需存储 token，只需要验证 token 信息是否正确即可，而 session 需要在服务端存储，一般是通过 cookie 中的 sessionID 在服务端查找对应的 session；
- 更适用于移动端（Android，iOS，小程序等等），像这种原生平台不支持 cookie，比如说微信小程序，每一次请求都是一次会话，当然我们可以每次去手动为他添加 cookie

不过也有缺点：
由于服务器不保存 token，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，**一旦 token 签发了，在到期之前就会始终有效**，除非服务器部署额外的逻辑。
所以一般时效比较短。

**JWT（JSON Web Token）就是基于 token 认证的代表**

由三部分组成，并用 `.` 连接，`Header.Payload.Signature`

Header 和 Payload 是不加密的，只是使用 `Base64URL` 算法转成字符串，所以不要放重要数据

Signature 部分是对前两部分的签名，防止数据篡改，密钥只有服务器才知道

```
HMACSHA256(
base64UrlEncode(header) + "." +
base64UrlEncode(payload),
secret)
```

一般 JWT 放在 HTTP 请求的头信息 `Authorization` 字段里面

```
Authorization: Bearer <token>
```

对比 Simple Web Tokens (SWT) and Security Assertion Markup Language Tokens (SAML) 的优势在：

- JSON 不如 XML 冗长，因此在编码时 JSON 的大小也较小，从而使 JWT 比 SAML 更为紧凑。这使得 JWT 是在 HTML 和 HTTP 环境中传递的不错的选择
- JSON 解析器在大多数编程语言中都很常见，这使使用 JWT 更加容易
- 安全性

##### OAuth2.0（开放授权）

允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用

github 的例子

- 在 github 注册一个第三方应用，填写回调地址
- 在第三方应用点击 github 登录，跳转 GitHub 授权中心（附带第三方应用 id），用户输入 github 账号密码，通过则返回一个 access token，重定向到第三方应用
- 获取 GitHub 数据资源

微信授权类似

#### SSO 认证

登录认证和业务系统分离，使用独立的登录中心，实现了在登录中心登录后，所有相关的业务系统都能免登录访问资源

OAuth2.0 和 SSO 在业务系统中都没有账号和密码，账号密码是存放在登录中心或授权服务器中的，这就是所谓的使用令牌代替账号密码访问应用。

SSO 的实现有很多框架，比如 CAS 框架，以下是 CAS 框架的官方流程图

![](../assets/CAS.png)

重点看下访问第二个业务系统是如何**免登陆**的？

和登录中心的会话在第一次访问的时候就建立了，存在 Cookie，访问第二个业务系统时，302 Location 重定向到登录中心，访问时会自动带上 Cookie，认证通过直接重定向到业务系统并带上 ticket。

[对 SSO 单点登录和 OAuth2.0 的区别和理解](https://zebinh.github.io/2020/03/SSOANDOAuth/)

</details>

#### 2、性能优化

preload、prefetch
