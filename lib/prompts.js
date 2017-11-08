const gitUser = require('./git-user');

const user = gitUser();
const defaultOpts = {
  description: 'A new project',
  version: '0.0.1',
  license: 'MIT',
  author: user.name,
  email: user.email
};

module.exports = [
  {
    type: 'list',
    name: 'template',
    message: '请选择项目模板',
    choices: [{
      name: 'vue项目',
      value: 'vue'
    }, {
      name: 'weex项目',
      value: 'weex'
    }]
  }, {
    type: 'input',
    name: 'description',
    default: defaultOpts.description,
    message: `请输入项目描述`,
  }, {
    type: 'input',
    name: 'version',
    default: defaultOpts.version,
    message: `请输入版本号`
  }, {
    type: 'input',
    name: 'author',
    default: defaultOpts.author,
    message: `请输入作者`
  }, {
    type: 'input',
    name: 'email',
    default: defaultOpts.email,
    message: `请输入作者邮箱`
  }, {
    type: 'input',
    name: 'license',
    default: defaultOpts.license,
    message: `请输入license`
  }
]
