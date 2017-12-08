> A front-end build tool 前端构建工具

## Installation

runtime environment
- Node.js 4+
- npm 3+

### How to use
```shell
$ npm i seven-cli -g
```

Step 1. create a vue-based project (vue scaffold will be downloaded automatically if not installed)
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

#### 0.0.10
* fix: 修复postcss options为null的时候，postcss-loader报错的bug

#### 0.0.9
* feat: 拆分模块，优化代码

## License
MIT
