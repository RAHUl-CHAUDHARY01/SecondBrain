"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
var ApiResponse = /** @class */ (function () {
    function ApiResponse(statusCode, data, message) {
        if (message === void 0) { message = "Success"; }
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
