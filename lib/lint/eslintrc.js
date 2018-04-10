module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "html"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true
  },
  "rules": {
    // 规则配置
    "no-console": 1,
    "no-debugger": 1,
    "no-extra-semi": 1,
    "no-constant-condition": 2,
    "no-extra-boolean-cast": 2,
    "use-isnan": 2,
    "no-undef-init": 2,
    "camelcase": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-const-assign":2,
    "no-func-assign": 2,
    "no-else-return": 1,
    "no-obj-calls": 2,
    "valid-typeof": 2,
    "no-unused-vars": 1,
    "quotes": 0,
    "object-curly-spacing": 1,
    "block-spacing": 1,
    "semi": 0,
    "no-extra-semi": 1,
    "keyword-spacing": 1,
    "comma-dangle": 0,
    "array-bracket-spacing": 1,
    "space-before-function-paren": 1,
    "no-extra-bind": 1,
    "no-var": "error",
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "arrow-body-style": ["error", "as-needed"],
    "no-empty-function": ["error", { "allow": ["arrowFunctions", "constructors"] }]
  }
}
