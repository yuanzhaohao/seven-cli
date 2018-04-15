import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Footer } = Layout;

export default class Foot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>Powered by QCloud</Footer>
    );
  }
}
