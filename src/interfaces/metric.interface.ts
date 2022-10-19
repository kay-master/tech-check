export type MetricTypes = "SHORTER_THAN_15" | "MOVER" | "SHAKER" | "?" | "SPAM";

export interface MetricResults {
	metricName: string;
	total: number;
}
