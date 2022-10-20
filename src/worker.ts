import readline from "readline";
import fs from "fs";
// import { parentPort } from "worker_threads";
import Process from "./controllers/process.controller";
import {
	MetricResults,
	WorkDataInterface,
} from "./interfaces/metric.interface";
import pluggableMetrics from "./plugs/metrics";

// To add more metrics, please add them into the metrics object ./plugs/metrics
const METRICS = pluggableMetrics;

async function workFn(input: WorkDataInterface) {
	const promised: Promise<MetricResults[][]> = new Promise((resolve) => {
		let results: MetricResults[][] = [];

		const rl = readline.createInterface({
			input: fs.createReadStream(input.filePath),
			crlfDelay: Infinity,
		});

		rl.on("line", (line) => {
			const init = new Process(line, METRICS);

			const data = init.run();

			results = [...results, data];
		});

		rl.on("close", () => {
			resolve(results);
		});
	});

	return await promised;
}

async function workPool(input: WorkDataInterface) {
	const results = await workFn(input);

	input.port.postMessage(results);

	return results;
}

export default workPool;
