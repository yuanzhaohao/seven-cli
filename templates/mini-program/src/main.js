export default {
  // 这个字段走 app.json
  config: {
    pages: [], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '{{ name }}',
      navigationBarTextStyle: 'black'
    },
  },
};
