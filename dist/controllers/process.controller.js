"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Main {
    constructor(data, metrics) {
        this.metrics = {};
        this.results = [];
        this.data = data;
        this.metrics = metrics;
    }
    convertToArray() {
        return Object.entries(this.metrics);
    }
    analyze() {
        const arrayMetrics = this.convertToArray();
        for (const metric of arrayMetrics) {
            const [propertyName, pluginFn] = metric;
            const resultData = pluginFn(this.data);
            let total = 0;
            if (typeof resultData === "boolean" && resultData) {
                total = 1;
            }
            else if (typeof resultData === "number") {
                total = resultData;
            }
            this.results.push({
                metricName: propertyName,
                total,
            });
        }
        // console.log("ts", this.results, this.data, "\n");
        return this.results;
    }
    run() {
        return this.analyze();
    }
}
exports.default = Main;
//# sourceMappingURL=process.controller.js.map