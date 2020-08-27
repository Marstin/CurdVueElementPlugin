import { Compiler } from 'webpack';
import ServiceTemplate from './template/ServiceTemplate'
import fs from 'fs'
import util from './util/util'

export interface Options {
  basePath?: string,
  servicePath: string,
  componentPath?: string,
  service: {
    add?: {
      url: string
    },
    list: {
      url: string
    },
    delete?: {
      url: string
    },
    update?: {
      url: string
    }
  },
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
    this.options = util.assign(this.defaultOption(),options)
  } 
  defaultOption(): Options{
    return {
      basePath: './src',
      servicePath: '/service/test.ts',
      componentPath: '/component',
      service:{
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
      this.createFile(this.options.basePath + this.options.servicePath )
    });
  }
  createFile(path: string){
    console.log(path);
    let serviceTemplate = new ServiceTemplate(this.options.service)
    console.log(serviceTemplate.getTemplate())
    fs.writeFile(path, serviceTemplate.getTemplate(), 'utf8', function (error) {
      if (error) {
        console.log(error)
        return false
      }
    })
  }
  writeTemplate(dir: string,name: string,content: string){
    let path = dir + '/' + name;
    this.hasDir(dir).then(() => {
      return this.hasNoFile(path)
    }).catch((flag)=> {
      return flag && this.createDir(dir)
    }).then(() => {
      this.writeFile(path,content)
    })
  }
  writeFile(path: string,content: string){
    return
  }

  hasNoFile(path: string){
    return new Promise((resolve,reject) => {
      if(true)
        resolve(true)
      else 
        reject(false)
    }) 
  }
  hasDir(dir: string){
    return new Promise((resolve,reject) => {
      if(true)
        resolve(true)
      else 
        reject(false)
    }) 
  }
  createDir(dir: string){
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