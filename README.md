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
  ├── manifest.json             # sketch 插件入口文件
  ├── common                    # resources 和 sketch 共用代码文件
  ├── resources                 # 视图端 webview (UI窗口)
  └── sketch                    # sketch 端定义的功能
├── static                      # 静态图片等资源
├── tsconfig.json               # ts 配置文件
├── tslint.json                 # lint 配置文件
├── typings                     # ts 类型定义文件
└── webpack.skpm.config.js      # skpm 配置文件
```

### Babel

To customize Babel, you have two options:

* You may create a [`.babelrc`](https://babeljs.io/docs/usage/babelrc) file in your project's root directory. Any settings you define here will overwrite matching config-keys within skpm preset. For example, if you pass a "presets" object, it will replace & reset all Babel presets that skpm defaults to.

* If you'd like to modify or add to the existing Babel config, you must use a `webpack.skpm.config.js` file. Visit the [Webpack](#webpack) section for more info.

### Webpack

To customize webpack create `webpack.skpm.config.js` file which exports function that will change webpack's config.

```js
/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {boolean} isPluginCommand - wether the config is for a plugin command or a resource
 **/
module.exports = function (config, isPluginCommand) {
  /** you can change config here **/
}
```

## Debugging

To view the output of your `console.log`, you have a few different options:
* Open `Console.app` and look for the sketch logs
* Use Safari's web inspector to debug your plugin's javascript context
* Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```bash
skpm log
```

The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input

