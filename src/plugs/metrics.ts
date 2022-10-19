import { MetricTypes } from "../interfaces/metric.interface";
import URLCheck from "../utils/urlRegex";

function matchFind(content: string, matchRegex: RegExp) {
	const match = content.match(matchRegex);

	if (Array.isArray(match)) {
		return match.length;
	}

	return 0;
}

const METRICS: MetricTypes = {
	// Total number of comments that are shorter than 15 characters
	shorter_than_15: (content: string) => {
		return content.length < 15;
	},
	// Total number of comments that refer to the "Mover" device
	mover: (content: string) => {
		return matchFind(content, /mover/gi);
	},
	// Total number of comments that refer to the "Shaker" device
	shaker: (content: string) => {
		return matchFind(content, /shaker/gi);
	},
	// Total number of comments that contain one on more question marks "?"
	questions: (content: string) => {
		return content.includes("?");
	},
	// Total number of comments that contain a URL to a web page
	spam: (content: string) => {
		return URLCheck(content);
	},
};

export default METRICS;
