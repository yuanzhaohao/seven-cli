## Change Log

#### 0.1.5
* update webpack-dev-middleware
* 优化hot-client逻辑

#### 0.1.4
* fix: vue-loader 13 need lower prettier
* feat: resume project when change abc.json file

#### 0.1.3
* postcss autoprefixer: 将postcss的配置移出来到项目中

#### 0.1.1
* bugfix: Style in async components can't extract to single CSS file

#### 0.1.0
* 抽离server
* 增加`configs.js`，将配置集中
* 优化代码

#### 0.0.16
* 增加`externals`配置
* 使用`webpack-visualizer-plugin`增加打包日志

#### 0.0.15
* update vue template: 补充`.babelrc`和`.gitignore`

#### 0.0.14
* update react template: 使用`react-router+antd+mobx`开发管理后台
* seven lint: 结合`eslint`检测代码

#### 0.0.13
* update react-template
* 支持热更新，在abc.json下设置`hotReplace: true`即可

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
