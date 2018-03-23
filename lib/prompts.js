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
    message: 'Select project template',
    choices: [{
      name: 'vue-mobile project',
      value: 'vue'
    }, {
      name: 'vue-element project',
      value: 'element'
    }, {
      name: 'mini-program project',
      value: 'mini-program'
    }, {
      name: 'react project',
      value: 'react'
    }, {
      name: 'electron-antd project',
      value: 'electron-antd'
    }, {
      name: 'weex project(coming soon...)',
      value: null
    }]
  }, {
    type: 'input',
    name: 'description',
    default: defaultOpts.description,
    message: `Project description`,
  }, {
    type: 'input',
    name: 'version',
    default: defaultOpts.version,
    message: `Project version`
  }, {
    type: 'input',
    name: 'author',
    default: defaultOpts.author,
    message: `Project author`
  }, {
    type: 'input',
    name: 'email',
    default: defaultOpts.email,
    message: `Author email`
  }, {
    type: 'input',
    name: 'license',
    default: defaultOpts.license,
    message: `Project license`
  }
]
