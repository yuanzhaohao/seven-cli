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
      name: 'vue-pc project',
      value: 'vue-pc'
    }, {
      name: 'weex project',
      value: 'weex'
    }, {
      name: 'react-mobile project',
      value: 'react'
    }, {
      name: 'react-pc project',
      value: 'react-pc'
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
