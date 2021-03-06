
import { observable } from "mobx";
import http from 'libs/http';

class Store {
  @observable records = [];
  @observable pwdRecords = [];
  @observable zones = [];
  @observable permRecords = [];
  @observable record = {};
  @observable idMap = {};
  @observable isFetching = false;
  @observable formVisible = false;
  @observable importVisible = false;

  @observable f_name;
  @observable f_zone;
  @observable f_host;

  fetchRecords = () => {
    this.isFetching = true;
    return http.get('/api/host/')
      .then(({hosts, zones, perms}) => {
        this.records = hosts;
        this.zones = zones;
        this.permRecords = hosts.filter(item => perms.includes(item.id));
        for (let item of hosts) {
          this.idMap[item.id] = item
        }
      })
      .finally(() => this.isFetching = false)
  };
  fetchPwdRecords = () => {
    this.isFetching = true;
    return http.get('/api/config/credentials/')
      .then(res => {
        this.pwdRecords = res;
      })
      .finally(() => this.isFetching = false)
  };
  showForm = (info = {}) => {
    this.formVisible = true;
    this.record = info
  }
}

export default new Store()
