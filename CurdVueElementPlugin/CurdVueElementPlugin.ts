import { Compiler } from 'webpack';
import { CurdVueElementPluginInterface } from './CurdVueElementPluginInterface'

export interface Options {

}



class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  constructor(options :Options = {}){

  } 
  apply(compiler: Compiler){
    compiler.plugin('done', function() {
      console.log('Hello World!');
    });
  }
  createFile(path: string){

  }
}
module.exports = CurdVueElementPlugin;



interface CUR {

}

export default CurdVueElementPlugin