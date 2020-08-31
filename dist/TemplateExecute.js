"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = tslib_1.__importDefault(require("./util"));
const ServiceTemplate_1 = tslib_1.__importDefault(require("./ServiceTemplate"));
const DefaultOptions_1 = require("./DefaultOptions");
class TemplateExecute {
    constructor(param, basedir) {
        this.option = this.getOption(param);
        this.basedir = basedir;
        this.name = util_1.default.getName(this.option.name);
    }
    getOption(param) {
        return util_1.default.assign(DefaultOptions_1.DefaultOption, param);
    }
    writeService() {
        let serviceTemplate = new ServiceTemplate_1.default(this.option.service);
        util_1.default.writeTemplate(this.basedir + '/' + this.option.serviceDir, this.name + '.ts', serviceTemplate.getTemplate());
    }
    writeView(dir) {
    }
    execute() {
        this.writeService();
    }
}
exports.default = TemplateExecute;
