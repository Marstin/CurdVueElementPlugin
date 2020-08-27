import { Compiler } from 'webpack';
import ServiceTemplate from './template/ServiceTemplate'
import fs from 'fs'
import util from './util/util'

export interface Options {
  basePath?: string,
  servicePath?: string,
  componentPath?: string,
  service?: Object,
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

export interface CurdVueElementPluginInterface {
  config?: any
  apply(compiler: Compiler): any
  createFile(path: string): any
}

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  options: Options
  constructor(options: Options){
    util.assign(this.defaultOption(),options)
  } 
  defaultOption(): Options{
    return {
      basePath: './src',
      servicePath: '/service',
      componentPath: '/component',
      service:{
        baseUrl:'',
        add: {
          url: '/add'
        },
        list: {
          url: '/list'
        },
        delete: {
          url: '/delete'
        },
        update: {
          url: '/update'
        },
        axios: {

        }
      },
      model: {
        primarykey:'id',
        item:[{
          text:'名称',
          name:'name'
        }]
      },
      searchModel: {

      },
      tree: {
        url: '',
        isSearchCondition: true,
        searchItem: 'id'
      }
    }
  }
  apply(compiler: Compiler){
    compiler.plugin('done', () => {
      this.createFile(this.options.servicePath)
    });
  }
  createFile(path: string){
    let serviceTemplate = new ServiceTemplate({listUrl:"/project/list"})
    console.log("start writing")
    fs.writeFile(path, serviceTemplate.getListServiceTemplate(), 'utf8', function (error) {
      if (error) {
        console.log(error)
        return false
      }
    })
  }
  writeTemplate(dir,name,content){
    let path = dir + '/' + name;
    this.hasDir(dir).then(() => {
      return this.hasNoFile(path)
    }).catch((flag)=> {
      return flag && this.createDir(dir)
    }).then(() => {
      this.writeFile(path,content)
    })
  }
  writeFile(path,content){
    
  }

  hasNoFile(path){
    return new Promise((resolve,reject) => {
      if(true)
        resolve(true)
      else 
        reject(false)
    }) 
  }
  hasDir(dir){
    return new Promise((resolve,reject) => {
      if(true)
        resolve(true)
      else 
        reject(false)
    }) 
  }
  createDir(dir){
    return new Promise((resolve,reject) => {
      if(true)
        resolve(true)
      else 
        reject(false)
    }) 
  }
  getTemplate(){

  }
  getComponentTemplate(){

  }
  getServiceTemplate(){

  }
}
module.exports = CurdVueElementPlugin;