# Pan

本项目基于 `skpm` 和 `umi` 进行搭建

## CLI Commands
### 安装
```bash
npm i
```
或
```bash
yarn
```

### 开发
``` bash
npm run dev
```
###  打包构建
```bash
npm run build
```


## 项目架构

```
├── README.md                   # 说明
├── package.json                # package.json
├── src                         # 源代码
  ├── resources                 # 视图端 webview (UI窗口)
  └── sketch                    # sketch 端定义的功能
  ├── bridge                    # 视图层和 sketch 端的通信层
  ├── common                    # resources 和 sketch 共用的模块文件
├── static                      # 静态图片等资源
├── tsconfig.json               # ts 配置文件
├── tslint.json                 # lint 配置文件
├── typings                     # ts 类型定义文件
└── webpack.skpm.config.js      # skpm 配置文件
```

## Resources

Resources 采用 umi 的架构,大家都懂 不再赘述

### 启动方式

`npm run dev:resources`

### 目录结构
```
resources
├── assets
├─ components
├── config
├── hooks
├── locales
├── models
├── pages
├── services
├── theme
├── tsconfig.json
└── utils
```
### 开发注意事项

1. 建议在浏览器端进行开发，需要用到和 sketch 的交互时再进入 sketch 测试。 预览URL为 http://url/#/{page}.html 
2. 代码模块引用不允许引入 sketch 层的模块 ,所有通信建议封装到 `service` 层

## Sketch
sketch 文件夹包含 Sketch 端的代码

### 开发方式
通过 `npm run dev:sketch` 进行 sketch 端开发 (需要启动 resources 端进行配合)

如果只需要跑 sketch 端代码,不涉及 webview 层,可以使用 `npm run dev:sketch-only` 只启动 sketch 端进行开发

### 目录结构

```
sketch
├── manifest.json             # sketch 插件入口文件
├── commands                  # 在插件栏可直接执行的脚本指令  
└── windows                   # Webview 窗口 每个文件代表一个窗口  
├── modules                   # 自行封装模块
├── utils                     # 工具函数
```

### 配置项

sketch 端使用 skpm 进行构建打包,配置文件在 `./webpack.skpm.config.js`,如有需要可以自定义

## Debug

应该都会了 就不写了...

To view the output of your `console.log`, you have a few different options:
* Open `Console.app` and look for the sketch logs
* Use Safari's web inspector to debug your plugin's javascript context
* Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```bash
skpm log
```

The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input


## Bridge
bridge 是 webview 和 sketch 的通信层,通过 channel 进行数据交换 (类似前后端分离)

本层定义了 
通信字段(`channel.ts`) webview 向 sketch 的发信方法 `sendMsg.ts`

```
bridge
├── channel.ts           # 通信信道字段
└── sendMsg.ts           # webview 向 sketch 层发信方法
├── index.ts             # 对外统一暴露接口
```

目前 `sendMsg.ts` 只包含了与 sketch 层的通信方式,未来若需扩展到 figma 等平台, 则可以根据平台判断,加入对应的通信方式,抹平端的差异

