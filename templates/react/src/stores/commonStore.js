import { observable, action, configure } from 'mobx';
configure({ enforceActions: true });

let hash = location.hash.replace('#/', '');

class CommonStore {
  @observable hash = hash;
  @observable collapsed = false;

  @action setCollapse(collapsed) {
    this.collapsed = collapsed;
  }

  @action setHash(hash) {
    this.hash = hash;
  }
}

export default new CommonStore();
