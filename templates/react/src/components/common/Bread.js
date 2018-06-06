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
    let breadcrumbItems = [];
    menuData.forEach(itemData => {
      if (itemData.children && itemData.children.length) {
        itemData.children.forEach(menu => {
          if (menu.url === hash) {
            currentItem = menu;
            breadcrumbItems.push({
              name: itemData.name,
              url: itemData.url
            });

            breadcrumbItems.push({
              name: menu.name,
              url: menu.url
            });
          } else {
            if (menu.children && menu.children.length) {
              menu.children.forEach(subpage => {
                if (subpage.url === hash) {
                  currentItem = subpage;
                  breadcrumbItems.push({
                    name: itemData.name,
                    url: itemData.url
                  });

                  breadcrumbItems.push({
                    name: menu.name,
                    url: menu.url
                  });

                  breadcrumbItems.push({
                    name: subpage.name,
                    url: subpage.url
                  });
                }
              });
            }
          }
        });
      } else if (itemData.url === hash) {
        currentItem = itemData;

        let temp = {
          name: itemData.name,
          url: itemData.url
        };
        breadcrumbItems.push(temp);
      }
    });
    let breadItemRender = (item, index) => {
      if (index === 0 || index === breadcrumbItems.length - 1) {
        return item.name;
      } else {
        return (
          <Link to={`/${item.url}`}>{item.name}</Link>
        );
      }
    }
    return (
      <Breadcrumb className="bread">
        {breadcrumbItems.map((item, index) =>
          <Breadcrumb.Item key={item.url}>{breadItemRender(item, index)}</Breadcrumb.Item>
        )}
      </Breadcrumb>
    );
  }
}
