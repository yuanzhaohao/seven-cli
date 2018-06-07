import React from 'react';
import { Spin } from 'antd';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      let emptyStyle = {
        width: '100%',
        paddingTop: '24px',
        paddingBottom: '24px',
        textAlign: 'center'
      };
      return this.state.component
        ? <this.state.component {...this.props} />
        : <div style={emptyStyle}>
          <Spin />
        </div>;
    }
  }

  return AsyncComponent;
}
