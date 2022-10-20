import fs from "fs";
import path from "path";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Piscina } from "piscina";
import { MessageChannel } from "worker_threads";

import { MetricResults, ResultInterface } from "./interfaces/metric.interface";
import combineData, { timeConvert } from "./utils/combineData";

console.log("\nAnalyzer is running ...\n\n");

const directoryPath = path.join(__dirname, "../docs");

async function promiseFn() {
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

				// Create a new thread pool
				const pool = new Piscina({
					filename: path.resolve(__dirname, "worker.js"),
				});

				for (const file of files) {
					const filePath = path.join(directoryPath, file);

					const channel = new MessageChannel();

					channel.port2.on("message", (message: MetricResults[][]) => {
						results = [...results, ...message];

						channel.port2.close();
					});

					channel.port2.on("close", () => {
						closedFiles++;
					});

					await pool.run(
						{
							filePath,
							port: channel.port1,
						},
						{ transferList: [channel.port1] }
					);

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

		const data = await promiseFn();

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
