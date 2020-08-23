"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceTemplate {
    constructor(config) {
        this.config = config;
    }
    getListService(listUrl) {
        return `import axios from 'axios'
function getList(){
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      url:' /project/list ',
      method:'get'
    }).then((res: any) => {
      resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
    })
  })
}`;
    }
}
exports.default = ServiceTemplate;
//# sourceMappingURL=template.js.map