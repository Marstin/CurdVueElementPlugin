
export interface Options {
  name: string,
  baseDir?: string,
  serviceDir: string,
  componentDir?: string,
  service: Array<string|ServiceOptions>,
  model: {
    primarykey?: string,
    item: Array<any>
  },
  searchModel?: Object,
  tree?:{
    url: string
    isSearchCondition: boolean,
    searchItem: string
  }
}

export interface ServiceTemplateInterface {
  templateFuncStack: Array<{func:Function,url?:string}>
}

export interface ServiceOptions {
  func:string
  url?:string
}

export interface CurdVueElementPluginInterface {
  config?: any
  apply(compiler: any): any
  excute(path: string,file: string): any
}