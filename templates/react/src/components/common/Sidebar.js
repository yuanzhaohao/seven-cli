import './sidebar.less';

import React from 'react';
import { Link, HashRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import menuData from '@/lib/menu';
import configData from '@/lib/config';

@inject('commonStore')
@observer

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    let { hash } = props.commonStore;
    this.defaultOpenKeys = getOpenKeys(hash);
  }
  render() {
    let { hash, collapsed } = this.props.commonStore;
    return (
      <Sider className="sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Link to={`/${configData.defaultUrl}`} className="logo">
          <div className="logo-image"></div>
          <div className={classnames(['logo-title', {
            'logo-hidden': collapsed
          }])}>{configData.projectName}</div>
        </Link>
        <Menu className="menu"
          theme="dark"
          mode="inline"
          onClick={this.onMenuClick}
          defaultOpenKeys={this.defaultOpenKeys}
          selectedKeys={[hash]}
        >
          {menuData.map((itemData, index) => {
            if (itemData.children && itemData.children.length) {
              return (
                <Menu.SubMenu key={itemData.url}
                  title={[
                    <Icon type={itemData.icon} key={1} />,
                    <span className="nav-text" key={2}>{itemData.name}</span>
                  ]}
                >
                  {itemData.children.map(menu => (
                    <Menu.Item key={menu.url}>
                      {menu.url !== hash
                        ? <Link to={`/${menu.url}`}>
                          <span className="nav-text">{menu.name}</span>
                        </Link>
                        : <span className="nav-text">{menu.name}</span>
                      }
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item key={itemData.url}>
                <Link to={`/${itemData.url}`}>
                  <Icon type={itemData.icon} />
                  <span className="nav-text">{itemData.name}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }

  onMenuClick = (e, special) => {
    const { commonStore } = this.props;

    if (e.key) {
      commonStore.setHash(e.key);
    }
  }
}

function getOpenKeys(hash) {
  let openKeys;

  menuData.forEach(itemData => {
    if (itemData.children && itemData.children.length) {
      let isKey = false;
      itemData.children.forEach(subItemData => {
        if (subItemData.url === hash) {
          isKey = true;
        }
      });
      if (isKey) openKeys = [itemData.url];
    }
  });

  return openKeys
}

export default Sidebar;
