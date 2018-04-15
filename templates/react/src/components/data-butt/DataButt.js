import './data-butt.less';

import React from 'react';
import { Card } from 'antd';

export default class DataButt extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="data-butt">数据概览</div>
    );
  }
}
