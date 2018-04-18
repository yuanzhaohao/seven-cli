import './header.less';

import React from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const { Header } = Layout;
const { SubMenu } = Menu;

@inject('commonStore')
@observer
class Head extends React.Component {
  render() {
    let { collapsed } = this.props.commonStore;
    return (
      <Header className="header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.onTriggerClick}
        />
        <div className="header-menu">
          <Dropdown overlay={
            <Menu onClick={this.onMenuClick}>
              <Menu.Item key="collaborator">协作者管理</Menu.Item>
              <Menu.Item key="authorization">营销授权</Menu.Item>
              <Menu.Item key="account">账户信息</Menu.Item>
              <Menu.Item key="logout">退出登录</Menu.Item>
            </Menu>
          } placement="bottomCenter">
            <span className="header-name">admin<Icon type="down" /></span>
          </Dropdown>
        </div>
      </Header>
    );
  }

  onMenuClick = ({ key }) => {
    switch (key) {
      case 'collaborator':
      case 'authorization':
      case 'account':
        this.handleSkip();
        break;
      case 'logout':
        this.handleLogout();
        break;
    }
  }

  handleSkip = () => {
    console.log('call handleSkip');
  }

  handleLogout = () => {
    console.log('call handleLogout');
  }

  onTriggerClick = () => {
    const { commonStore } = this.props;
    let collapsed = !commonStore.collapsed;
    commonStore.setCollapse(collapsed);
  }
}

export default Head;
