![blockchain](../assets/cms/img/logo.svg "九方科技")

## 更新记录
版本|作者|时间|描述
:---|:---|:---|:---
1.0|sam|2022/09/25|第一版,小小的嘚瑟一下

---
>市面上各种文档架设都非常的高级，已致于都学不会了，于是用了一天时间撸了一个简单的文档系统，纯静态环境，随便有一个空间就可以运行，不用node.js，不用vue，不用npm。简简单单，有个能访问的空间就行，哪怕只有几m空间。文档是markdown格式，写好上传即可，虽然小巧、但是功能也马马虎虎了,非常适合小萌新使用

## 功能
+ 项目大类,可以同时放置若干项目文档
+ 文档列表无线分类
+ Markdown文件渲染
+ 文档内目录生成导航(从H2开始编录，支持到H3,其它标题不支持列入，防止爆屏，以后再细化)
+ 滚屏浏览（滚动时不可选择，以保证效果）
+ 截图分享，可以配置局部截图或者是全面长图
+ 二维码分享

## 数据
返回json即可，可以是生成的json文件，也可以是api反馈结果，适当修改一下请求函数即可

## 架构
本文档系统简单到不配谈架构，都是开源的东西拼凑的，感谢
- __[jQuery](https://jquery.com/)__ - jQuery是一个快速、简洁的JavaScript框架，于2006年1月由John Resig发布。

- __[BootStrap](https://blog.getbootstrap.com)__ - Bootstrap 是全球最流行的前端开源工具包，它支持 Sass 变量和 mixins、响应式网格系统、大量的预建组件和强大的 JavaScript 插件，助你快速设计和自定义响应式、移动设备优先的站点。

- __[BootStrapIcons](https://icons.getbootstrap.com)__ - BootstrapIcons 拥有 `1600` 多个图标的免费、高质量的开源图标库。你可以以任何方式使用它们，例如 SVG 矢量图、SVG sprite 或 web 字体形式。并不局限于使用 Bootstrap 前端框架的项目。

- __[zTree.js](https://treejs.cn/v3/main.php#_zTreeInfo)__ - zTree 是一个依靠 jQuery 实现的多功能 “树插件”。优异的性能、灵活的配置、多种功能的组合是 zTree 最大优点。。

- __[Marked](https://github.com/markedjs/marked)__ - marked 是一个 JavaScript 编写的全功能 Markdown 解析和编译器。 marked 的目的是快速的编译超大块的Markdown文本而不必担心结果会出乎意料或者花费很长时间。

- __[Animate.css](http://daneden.me/animate)__ - Animate.css是一个有趣的，跨浏览器的 css3 动画库，内置了很多典型的 css3 动画，兼容性好使用方便。。

- __[WOW.js](https://www.delac.io/WOW/)__ - WOW.js 实现了在网页滚动时的动画效果。需要 Animate.css 项目的支持。

- __[google-code-prettify](https://github.com/googlearchive/code-prettify)__ - google-code-prettify一个优秀精巧的代高亮工具

- __[QRCode.js](https://github.com/davidshimjs/qrcodejs)__ - QRCode.js 是一个用于生成二维码的 JavaScript 库。主要是通过获取 DOM 的标签,再通过 HTML5 Canvas 绘制而成,不依赖任何库。


## 主题风格

主题风格借了 __[Soft-UI](https://demos.creative-tim.com/marketplace/soft-ui-design-system-pro/presentation.html)__ - 的SVG动画和菜单效果

## 待办事项

### 功能

- [x] 配置后台
- [x] API
- [x] 打印文档
- [x] API在线测试
- [x] 代码预览运行
- [x] 暗亮切换
- [x] 集成流程图

### 优化

- [x] 完善文档
- [x] 侧边栏样式优化
- [x] 增加 icon 功能
- [ ] 增加图片适配暗色模式的配置

---
尽人事，听天命，再不行就去他大爷的~~