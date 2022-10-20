export type MetricTypes = Record<string, (content: string) => boolean | number>;

export interface MetricResultCollection {
	metricName: string;
	results: number | boolean;
}

export interface MetricResults {
	metricName: string;
	total: number;
}

export interface ResultInterface {
	msg: string;
	error?: NodeJS.ErrnoException;
	results?: MetricResults[][];
}

export interface WorkDataInterface {
	filePath: string;
	metrics: MetricTypes;
	port: MessagePort;
}
