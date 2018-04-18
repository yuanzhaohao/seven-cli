import './footer.less';
import React from 'react';
import { Layout } from 'antd';
import configData from '@/lib/config';
const { Footer } = Layout;


export default class Foot extends React.Component {
  render() {
    return (
      <Footer className="copyright">Powered by {configData.author}</Footer>
    );
  }
}
