> A front-end build tool 前端构建工具

<p align="center">
  <a href="https://www.npmjs.com/package/seven-cli"><img src="https://img.shields.io/npm/dm/seven-cli.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/seven-cli"><img src="https://img.shields.io/npm/v/seven-cli.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/seven-cli"><img src="https://img.shields.io/npm/l/seven-cli.svg" alt="License"></a>
</p>

## Installation

runtime environment
- Node.js 4+
- npm 3+

### How to use
```shell
$ npm i seven-cli -g
```

Step 1. create a project
```shell
$ seven init my-project
$ cd my-project
```

Step 2. start developing
```shell
$ seven dev
```

Step 3. production
```shell
$ seven build
```

## Change Log

#### 0.0.12
* seven-build时，检测版本更新
* seven-init时，若在项目里则自动install依赖

#### 0.0.11
* seven-dev时，使用open打开链接
* 增加electron template
* 把template内置在项目中

#### 0.0.10
* fix: 修复postcss options为null的时候，postcss-loader报错的bug

#### 0.0.9
* feat: 拆分模块，优化代码

## License
MIT
