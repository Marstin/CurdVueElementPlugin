"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceTemplate {
    constructor(config) {
        this.config = config;
    }
    getListServiceTemplate(url) {
        return `import axios from 'axios'
function getList(){
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      url:' ${url || '/project/list'} ',
      method:'get'
    }).then((res: any) => {
      resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
    })
  })
}`;
    }
    getAddService(url) {
        return `updateProject(data: any) {
  return new Promise((resolve: Function,reject: Function) => {
    axios({
      url:'/app/projectManage/updateSelective',
      method:'post',
      data:qs.stringify(data)
    }).then((res: any) => {
      resolve(res.data)
    }).catch((err: any) => {
      reject(err)
    });
  })
}`;
    }
}
exports.default = ServiceTemplate;
