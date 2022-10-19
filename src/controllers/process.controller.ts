import { MetricResults, MetricTypes } from "../interfaces/metric.interface";

class Main {
	private data: string;
	private metrics: MetricTypes = {};
	private results: MetricResults[] = [];

	constructor(data: string, metrics: MetricTypes) {
		this.data = data;
		this.metrics = metrics;
	}

	private convertToArray() {
		return Object.entries(this.metrics);
	}

	private analyze() {
		const arrayMetrics = this.convertToArray();

		for (const metric of arrayMetrics) {
			const [propertyName, pluginFn] = metric;

			const resultData = pluginFn(this.data);

			let total = 0;

			if (typeof resultData === "boolean" && resultData) {
				total = 1;
			} else if (typeof resultData === "number") {
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

	public run() {
		return this.analyze();
	}
}

export default Main;
