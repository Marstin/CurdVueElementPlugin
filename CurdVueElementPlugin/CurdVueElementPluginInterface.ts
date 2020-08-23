import { Compiler } from 'webpack';

export interface CurdVueElementPluginInterface {
  apply(compiler: Compiler)
  createFile(path: string)
}