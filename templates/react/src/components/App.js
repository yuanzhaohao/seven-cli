import "./app.less";

import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';

import Contents from './common/Contents';
import Sidebar from './common/Sidebar';
import Bread from './common/Bread';
import Header from './common/Header';
import Footer from './common/Footer';

import emitter from '@/lib/emitter';
import menuData from '@/lib/menu';

@inject('commonStore')
@observer

export default class Main extends React.Component {
  render() {
    let { collapsed } = this.props.commonStore;

    return (
      <Layout>
        <Sidebar />

        <Layout className={classnames(['container', {
          'container-collapsed': collapsed
        }])}>
          <Header />
          <Bread />
          <Contents />
          <Footer />
        </Layout>
      </Layout>
    );
  }
};