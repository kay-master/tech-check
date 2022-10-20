"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeConvert = void 0;
/**
 * Combine collected data set
 */
function combineData(data) {
    const results = {};
    for (const result of data) {
        result.forEach((item) => {
            const propertyName = String(item.metricName).toUpperCase();
            if (results[propertyName]) {
                results[propertyName] += item.total;
            }
            else {
                results[propertyName] = item.total;
            }
        });
    }
    return results;
}
function timeConvert(mil) {
    return (mil / 1000).toFixed(2);
}
exports.timeConvert = timeConvert;
exports.default = combineData;
//# sourceMappingURL=combineData.js.map