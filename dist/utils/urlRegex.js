"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * URL test regex
 */
function URLCheck(str) {
    return new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(str);
}
exports.default = URLCheck;
//# sourceMappingURL=urlRegex.js.map