## 目录结构
```
 ·assets  //资源文件
  |+ cms   //静态资源目录
  | |__ css
  | |__ js
  | |__ img
  |+ json //配置文件和数据目录，这里可以被api取代
·docs //Markdown目录
  |__ help //系统默认目录
  |__ api //样例
  |__ cms //样例
· ins //插件目录
  |__ home //前台目录
· vendor //框架目录
  |__ bootstrap
  |__ bootstrap-icons
  |__ canvas 
  |__ jquery

```
## 配置文件
```
{
    /**
     * 核心功能配置，可以不动
     */
  "opts": {
    "name":"九方文档系统(NaDoc)",
    "apiBaseUrl": "/api", //API基址
    "base": "/ins/home/", //插件目录
    "welocme": "welcome.json", //默认初始的项目
    "minimenu": true, //右侧迷你小菜单
    "popday": false, //节日海报
    "dbscroll": true, //双击滚屏
    "capture": true, //截图
    "qrcode": true, // 二维码
    "prettify": true //代码高亮
  },
    /**
     * WOW.js配置
     */
  "wow": {
    "boxClass": "wow",
    "animateClass": "animated",
    "offset": 30,
    "mobile": true,
    "live": true
  },
    /**
     * marked配置
     */
  "marked": {
    "renderer": "rmd",
    "gfm": true,
    "tables": true,
    "breaks": false,
    "pedantic": true,
    "sanitize": false,
    "smartLists": false,
    "smartypants": false,
    "silent": true,
    "tokenizer": null,
    "walkTokens": null,
    "xhtml": true
  },
    /**
     * zTeee配置
     */
  "ztree": {
    "view": {
      "dblClickExpand": false,
      "addHoverDom": false,
      "removeHoverDom": false,
      "selectedMulti": false,
      "showIcon": false,
      "addDiyDom": false,
      "nameIsHTML": false
    },
    "check": {
      "enable": false
    },
    "data": {
      "key": {
        "name": "name",
        "open": "open",
        "show": "show"
      },
      "simpleData": {
        "enable": true,
        "idKey": "id",
        "pIdKey": "pid",
        "rootPId": null
      }
    },
    "callback": {
      "onClick": "onClick()"
    },
    "edit": {
      "enable": false
    }
  },
    /**
     * 主菜单配置，增加一个就会出现在顶部
     */
  "menu": [
    {
      "id": "1",
      "name": "DEMO",
      "json": "app.json"
    },
    {
      "id": "2",
      "name": "三体",
      "json": "doc.josn"
    },
    {
      "id": "3",
      "name": "寻秦记",
      "json": "harbin.json"
    }
  ]
}
```
## 数据样例
```
[
    {
        "id": 1,
        "pid": 0,
        "name": "欢迎",
        "show": "docs/help/welcome.md"
    },
    {
        "id": 2,
        "pid": 0,
        "name": "快速上手",
        "show": "docs/help/quick.md"
    },
    {
        "id": 3,
        "pid": 0,
        "name": "使用手册",
        "show": "docs/help/document.md"
    }
]
```