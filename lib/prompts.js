const gitUser = require('./gitUser');

const user = gitUser();
const defaultOpts = {
  desc: 'A new project',
  branch: '0.0.1',
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
    name: 'desc',
    message: `请输入项目描述[${defaultOpts.desc}]: `
  }, {
    type: 'input',
    name: 'branch',
    message: `请输入项目分支[${defaultOpts.branch}]: `
  }, {
    type: 'input',
    name: 'author',
    message: `请输入作者[${defaultOpts.author}]: `
  }, {
    type: 'input',
    name: 'email',
    message: `请输入作者邮箱[${defaultOpts.email}]: `
  }
]
