"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assign_1 = tslib_1.__importDefault(require("./assign"));
const file_1 = tslib_1.__importDefault(require("./file"));
exports.default = { ...assign_1.default, ...file_1.default };
