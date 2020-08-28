import { Compiler } from 'webpack';
import ServiceTemplate from './template/ServiceTemplate'
import fs from 'fs'
import util from './util/util'
import { promised } from 'q';
import { resolve, reject } from 'any-promise';

export interface Options {
  name: string,
  baseDir?: string,
  serviceDir: string,
  componentDir?: string,
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
  excute(path: string,file: string): any
}

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  options: Options
  constructor(options: Options){
    this.options = util.assign(this.defaultOption(),options)
  } 
  defaultOption(): Options{
    return {
      name:'test',
      baseDir: './src',
      serviceDir: '/service',
      componentDir: '/component',
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
      this.excute(this.options.baseDir + this.options.serviceDir,this.options.name + '.ts')
    });
  }
  excute(dir: string,file: string){
    const path = dir + '/' + file;
    let serviceTemplate = new ServiceTemplate(this.options.service)
    this.writeTemplate(dir,file,serviceTemplate.getTemplate())
  }
  
  writeTemplate(dir: string,name: string,content: string){
    return new Promise((resolve,reject) => {
      const path = dir + '/' + name;
      this.hasNoFile(path)
        .then(() => this.createDir(dir))
        .then(() => this.writeFile(path,content))
        .then(_ => resolve(`Info:${path}文件写入完成`))
        .catch(err => reject(err) );
    })
  }

  createDir(dir: string){
    return new Promise((resolve,reject) => {
      fs.mkdir(dir,{recursive: true},(err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }) 
  }

  writeFile(path: string,content: string){
    return new Promise((resolve,reject) => {
      fs.writeFile(path, content, 'utf8', function (err) {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }) 
  }

  hasNoFile(path: string){
    return new Promise((resolve,reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        err ? resolve():reject(`Warn: ${path} 已存在`)
      });
    }) 
  }
}
module.exports = CurdVueElementPlugin;