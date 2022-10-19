import fs from "fs";
import path from "path";
import Process from "./controllers/process.controller";

const METRICS = ["SHORTER_THAN_15", "MOVER", "SHAKER", "?", "SPAM"];

console.log("\nAnalyzer is running ...\n\n");

console.time("Time");

const directoryPath = path.join(__dirname, "docs");

fs.readdir(directoryPath, (error, files) => {
	// error handling
	if (error) {
		return console.error("Unable to read directory: ", error);
	}

	files.forEach((file) => {
		const filePath = path.join(__dirname, "docs", file);

		fs.readFile(filePath, "utf8", (readError, data) => {
			if (readError) {
				return console.error("Unable to read: ", readError);
			}

			const init = new Process(data, METRICS);

			init.run();
		});
	});
});

console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
console.timeEnd("Time");
