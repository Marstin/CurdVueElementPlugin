"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ServiceTemplate_1 = tslib_1.__importDefault(require("./ServiceTemplate"));
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
                list: {},
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
        compiler.plugin('compilation', () => {
            this.excute(this.options.baseDir + this.options.serviceDir, this.options.name + '.ts');
        });
    }
    excute(dir, file) {
        const path = dir + '/' + file;
        let serviceTemplate = new ServiceTemplate_1.default(this.options.service);
        util_1.default.writeTemplate(dir, file, serviceTemplate.getTemplate());
    }
}
module.exports = CurdVueElementPlugin;
