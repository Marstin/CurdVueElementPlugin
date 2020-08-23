import { Compiler } from 'webpack';

export interface CurdVueElementPluginInterface {
  apply(compiler: Compiler): any
  createFile(path: string): any
}