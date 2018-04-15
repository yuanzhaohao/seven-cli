import './crowd.less';

import React from 'react';
import { Card } from 'antd';

export default class Crowd extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="crowd">人群优选</div>
    );
  }
}
