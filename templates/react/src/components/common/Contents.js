import './contents.less';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;

import NotFound from './NotFound';
import asyncComponent from '@/components/asyncComponent'

// import DataOverview from '../data-overview/DataOverview';
// import DataButt from '../data-butt/DataButt';
// import Crowd from '../crowd/Crowd';
// import DataInsight from '../data-insight/DataInsight';
// import Marketing from '../marketing/Marketing';

const DataOverview = asyncComponent(() => import('../data-overview/DataOverview'));
const DataButt = asyncComponent(() => import('../data-butt/DataButt'));
const Crowd = asyncComponent(() => import('../crowd/Crowd'));
const DataInsight = asyncComponent(() => import('../data-insight/DataInsight'));
const Marketing = asyncComponent(() => import('../marketing/Marketing'));

export default class Contents extends React.Component {
  render() {
    return (
      <Content className="content">
        <Switch>
          <Route exact path="/data-overview" component={DataOverview} />
          <Route exact path="/data-butt" component={DataButt} />
          <Route exact path="/crowd" component={Crowd} />
          <Route exact path="/data-insight" component={DataInsight} />
          <Route exact path="/marketing" component={Marketing} />
          <Route exact path="*" component={NotFound} />

        </Switch>
      </Content>
    );
  }
}
