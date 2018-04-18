import { observable, action, configure } from 'mobx';
import configData from '@/lib/config';

configure({ enforceActions: true });
const hash = location.hash.replace('#/', '');


class CommonStore {
  @observable hash = hash || configData.defaultUrl;
  @observable collapsed = false;

  @action setCollapse(collapsed) {
    this.collapsed = collapsed;
  }

  @action setHash(hash) {
    this.hash = hash;
  }
}

export default new CommonStore();
