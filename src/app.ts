import fs from "fs";
import path from "path";
import readline from "readline";
import pluggableMetrics from "./plugs/metrics";
import Process from "./controllers/process.controller";
import { MetricResults, ResultInterface } from "./interfaces/metric.interface";
import combineData, { timeConvert } from "./utils/combineData";

console.log("\nAnalyzer is running ...\n\n");

// To add more metrics, please add them into the metrics object ./plugs/metrics
const METRICS = pluggableMetrics;

const directoryPath = path.join(__dirname, "../docs");

async function processFn() {
	const promisedData: Promise<ResultInterface> = new Promise(
		(resolve, reject) => {
			let results: MetricResults[][] = [];
			let closedFiles = 0;

			fs.readdir(directoryPath, async (error, files) => {
				if (error) {
					reject({
						msg: "Unable to read directory",
						error,
					});

					return;
				}

				// let ts = 0;
				// const limit = 1;
				const totalFiles = files.length;

				for (const file of files) {
					const filePath = path.join(directoryPath, file);

					const rl = readline.createInterface({
						input: fs.createReadStream(filePath),
						crlfDelay: Infinity,
					});

					rl.on("line", (line) => {
						const init = new Process(line, METRICS);

						const data = init.run();

						results = [...results, data];
					});

					rl.on("close", () => {
						closedFiles++;
					});

					// ts++;

					// if (ts === limit) {
					// 	break;
					// }
				}

				const intervalCheck = setInterval(() => {
					if (totalFiles === closedFiles) {
						clearInterval(intervalCheck);

						resolve({
							msg: "Analyses is complete",
							results,
						});
					}
				}, 1000);
			});
		}
	);

	return await promisedData;
}

(async () => {
	try {
		const start = performance.now();

		const data = await processFn();

		if (data.error) {
			console.error(data.msg, data.error);

			console.log(
				`\nExecution time: ${timeConvert(performance.now() - start)} s\n`
			);
			return;
		}

		console.log("RESULTS\n=======");

		const results = combineData(data.results || []);

		Object.entries(results).forEach((result) => {
			console.log(`${result[0]} : ${result[1]}`);
		});

		console.log(
			`\nExecution time: ${timeConvert(performance.now() - start)} s\n`
		);
	} catch (error) {
		console.error(error);
	}
})();
