import { Compiler } from 'webpack';
import ServiceTemplate from './template/ServiceTemplate'
import fs from 'fs'
import lodash from 'lodash'

export interface Options {
  servicePath?: string
}

export interface DefaultOption {
  servicePath: string
}

export interface CurdVueElementPluginInterface {
  config?: any
  apply(compiler: Compiler): any
  createFile(path: string): any
}

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  config:any
  constructor(options :Options = {}){
    this.config = options
    lodash.assign(this.config,options)
  } 
  apply(compiler: Compiler){
    compiler.plugin('done', () => {
      this.createFile(this.config.servicePath)
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