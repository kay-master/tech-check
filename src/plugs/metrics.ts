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
	shorter_than_15: (content: string) => {
		return content.length < 15;
	},
	mover: (content: string) => {
		return matchFind(content, /mover/gi);
	},
	shaker: (content: string) => {
		return matchFind(content, /shaker/gi);
	},
	questions: (content: string) => {
		return content.includes("?");
	},
	spam: (content: string) => {
		return URLCheck(content);
	},
};

export default METRICS;
