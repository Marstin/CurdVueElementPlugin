"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ServiceTemplate_1 = tslib_1.__importDefault(require("./template/ServiceTemplate"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = tslib_1.__importDefault(require("./util/util"));
class CurdVueElementPlugin {
    constructor(options) {
        this.options = util_1.default.assign(this.defaultOption(), options);
    }
    defaultOption() {
        return {
            basePath: './src',
            servicePath: '/service/test.ts',
            componentPath: '/component',
            service: {
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
                primarykey: 'id',
                item: [{
                        text: '名称',
                        name: 'name'
                    }]
            },
            searchModel: {},
            tree: {
                url: '',
                isSearchCondition: true,
                searchItem: 'id'
            }
        };
    }
    apply(compiler) {
        compiler.plugin('done', () => {
            this.createFile(this.options.basePath + this.options.servicePath);
        });
    }
    createFile(path) {
        console.log(path);
        let serviceTemplate = new ServiceTemplate_1.default(this.options.service);
        console.log(serviceTemplate.getTemplate());
        fs_1.default.writeFile(path, serviceTemplate.getTemplate(), 'utf8', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
        });
    }
    writeTemplate(dir, name, content) {
        let path = dir + '/' + name;
        this.hasDir(dir).then(() => {
            return this.hasNoFile(path);
        }).catch((flag) => {
            return flag && this.createDir(dir);
        }).then(() => {
            this.writeFile(path, content);
        });
    }
    writeFile(path, content) {
        return;
    }
    hasNoFile(path) {
        return new Promise((resolve, reject) => {
            if (true)
                resolve(true);
            else
                reject(false);
        });
    }
    hasDir(dir) {
        return new Promise((resolve, reject) => {
            if (true)
                resolve(true);
            else
                reject(false);
        });
    }
    createDir(dir) {
        return new Promise((resolve, reject) => {
            if (true)
                resolve(true);
            else
                reject(false);
        });
    }
    getTemplate() {
    }
    getComponentTemplate() {
    }
    getServiceTemplate() {
    }
}
module.exports = CurdVueElementPlugin;
