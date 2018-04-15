import './data-insight.less';

import React from 'react';
import { Card } from 'antd';

export default class DataInsight extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="data-insight">数据洞察</div>
    );
  }
}
