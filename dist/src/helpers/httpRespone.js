"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    successRespone: function (_a) {
        var _b = _a.status, status = _b === void 0 ? 200 : _b, _c = _a.message, message = _c === void 0 ? 'Thành công' : _c, _d = _a.success, success = _d === void 0 ? true : _d, data = _a.data;
        return {
            status: status,
            message: message,
            success: success,
            data: data
        };
    }
};
