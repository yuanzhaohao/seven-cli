import 'antd/dist/antd.less';
import '@/less/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return <h3>Helloworld!</h3>;
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
