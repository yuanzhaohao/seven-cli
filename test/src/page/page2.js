import App from '../components/page2/index';

window.addEventListener('DOMContentLoaded', function() {
  new Vue({
    el: '#app',
    template: '<App />',
    components: { App }
  });
});
