const path = require('path');
const fs = require('fs');
const glob = require('glob');
const formatter = require('eslint-friendly-formatter');
const utils = require('./utils');

const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine(
  {
    "parser": "babel-eslint",
    "plugins": [
      "react",
      "html"
    ],
    "env": {
      "es6": true,
      "browser": true,
      "commonjs": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType\"": "module",
      "ecmaFeatures": {
        "jsx": true,
        "modules": true,
        "experimentalObjectRestSpread": true
      }
    },
    "rules": {
      "strict": [
        0
      ],
      "indent": [
        2,
        2,
        {
          "SwitchCase": 1
        }
      ],
      "quotes": [
        2,
        "single"
      ],
      "linebreak-style": [
        2,
        "unix"
      ],
      "semi": [
        2,
        "always"
      ],
      "no-multi-spaces": [
        2
      ],
      "no-self-compare": [
        2
      ],
      "max-depth": [
        2,
        4
      ],
      "max-nested-callbacks": [
        2,
        4
      ],
      "max-params": [
        2,
        4
      ],
      "max-statements": [
        2,
        25
      ],
      "max-statements-per-line": [
        2
      ],
      "max-len": [
        2,
        120
      ],
      "multiline-ternary": [
        0
      ],
      "callback-return": [
        2
      ],
      "handle-callback-err": [
        2
      ],
      "array-bracket-spacing": [
        2
      ],
      "no-const-assign": [
        2
      ],
      "no-return-assign": [
        2
      ],
      "no-inner-declarations": [
        2
      ],
      "no-var": [
        2
      ],
      "no-console": [
        1
      ],
      "no-lonely-if": [
        2
      ],
      "require-jsdoc": [
        0,
        {
          "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true
          }
        }
      ],
      "valid-jsdoc": [
        2
      ],
      "comma-dangle": [
        2,
        "never"
      ],
      "no-undef": [
        2
      ],
      "react/jsx-uses-react": [
        2
      ],
      "react/jsx-uses-vars": [
        2
      ],
      "react/jsx-no-undef": [
        2
      ]
    }
  }
);

module.exports = function lint(folder) {
  let srcPath = folder && fs.existsSync(utils.cwd(folder))
    ? utils.cwd(folder)
    : utils.cwd('./src');

  let files = glob.sync('./src/**/*.js');
  files.forEach(function(fileName) {
    let filePath = utils.cwd(fileName);
    let srcText = fs.readFileSync(filePath, { encoding: 'utf8' });
    let res = cli.executeOnText(srcText, filePath, true);
    let reportOutput = formatter(res.results);
    console.log(reportOutput);
  });
}
