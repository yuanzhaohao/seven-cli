import './bread.less';

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';
import menuData from '@/lib/menu';

@inject('commonStore')
@observer

export default class Bread extends React.Component {
  render() {
    let { hash, collapsed } = this.props.commonStore;
    let currentItem = null;
    menuData.forEach(itemData => {
      if (itemData.children && itemData.children.length) {
        itemData.children.forEach(menu => {
          if (menu.url === hash) {
            currentItem = menu;
          }
        });
      } else if (itemData.url === hash) {
        currentItem = itemData;
      }
    });
    return (
      <Breadcrumb className="bread">
        {currentItem
          ? <Breadcrumb.Item>{currentItem.name}</Breadcrumb.Item>
          : null
        }
      </Breadcrumb>
    );
  }
}
