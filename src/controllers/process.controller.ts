import { MetricResults } from "../interfaces/metric.interface";

class Main {
	private data: string;
	private metrics: string[] = [];
	private results: MetricResults[] = [];

	constructor(data: string, metrics: string[]) {
		this.data = data;
		this.metrics = metrics;
	}

	private analyze() {
		console.log(this.data);
	}

	public run() {
		this.analyze();
		console.log("RESULTS\n=======");
		console.log("Start making money");
	}
}

export default Main;
