"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ServiceTemplate_1 = tslib_1.__importDefault(require("./ServiceTemplate"));
const util_1 = tslib_1.__importDefault(require("./util/util"));
const DefaultOptions_1 = tslib_1.__importDefault(require("./DefaultOptions"));
class CurdVueElementPlugin {
    constructor(options) {
        this.defaultOption = () => ({ ...DefaultOptions_1.default });
        this.options = util_1.default.assign(this.defaultOption(), options);
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
