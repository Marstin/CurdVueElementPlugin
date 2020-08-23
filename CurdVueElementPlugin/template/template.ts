interface ServiceTemplateInterface {
  config:ServiceOptions
}

interface ServiceOptions {
  listUrl?:string;
}

class ServiceTemplate implements ServiceTemplateInterface {
  config: ServiceOptions
  constructor(config: ServiceOptions){
    this.config = config;
  }
  getListService(listUrl?: string){
    return `function getList(){
      return new Promise((resolve: Function, reject: Function) => {
        axios({
          url:' ${ listUrl || this.config.listUrl || ''} ',
          method:'get'
        }).then((res: any) => {
          resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
        })
      })
    }`
  }
}


export default ServiceTemplate