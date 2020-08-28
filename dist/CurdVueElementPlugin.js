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
            name: 'test',
            baseDir: './src',
            serviceDir: '/service',
            componentDir: '/component',
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
            this.excute(this.options.baseDir + this.options.serviceDir, this.options.name + '.ts');
        });
    }
    excute(dir, file) {
        const path = dir + '/' + file;
        let serviceTemplate = new ServiceTemplate_1.default(this.options.service);
        this.writeTemplate(dir, file, serviceTemplate.getTemplate());
    }
    writeTemplate(dir, name, content) {
        return new Promise((resolve, reject) => {
            const path = dir + '/' + name;
            this.hasNoFile(path)
                .then(() => this.createDir(dir))
                .then(() => this.writeFile(path, content))
                .then(_ => resolve(`Info:${path}文件写入完成`))
                .catch(err => reject(err));
        });
    }
    createDir(dir) {
        return new Promise((resolve, reject) => {
            fs_1.default.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(path, content, 'utf8', function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    hasNoFile(path) {
        return new Promise((resolve, reject) => {
            fs_1.default.access(path, fs_1.default.constants.F_OK, (err) => {
                err ? resolve() : reject(`Warn: ${path} 已存在`);
            });
        });
    }
}
module.exports = CurdVueElementPlugin;
