import React from 'react';
import { Card } from 'antd';

export default class NotFound extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ textAlign: 'center' }}>404</Card>
    );
  }
}
