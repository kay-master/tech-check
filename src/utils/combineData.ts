import { MetricResults } from "../interfaces/metric.interface";

/**
 * Combine collected data set
 */
function combineData(data: MetricResults[][]) {
	const results: Record<string, number> = {};

	for (const result of data) {
		result.forEach((item) => {
			const propertyName = String(item.metricName).toUpperCase();

			if (results[propertyName]) {
				results[propertyName] += item.total;
			} else {
				results[propertyName] = item.total;
			}
		});
	}

	return results;
}

export default combineData;
