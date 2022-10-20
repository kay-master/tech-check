"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlRegex_1 = __importDefault(require("../utils/urlRegex"));
function matchFind(content, matchRegex) {
    const match = content.match(matchRegex);
    if (Array.isArray(match)) {
        return match.length;
    }
    return 0;
}
const METRICS = {
    // Total number of comments that are shorter than 15 characters
    shorter_than_15: (content) => {
        return content.length < 15;
    },
    // Total number of comments that refer to the "Mover" device
    mover: (content) => {
        return matchFind(content, /mover/gi);
    },
    // Total number of comments that refer to the "Shaker" device
    shaker: (content) => {
        return matchFind(content, /shaker/gi);
    },
    // Total number of comments that contain one on more question marks "?"
    questions: (content) => {
        return content.includes("?");
    },
    // Total number of comments that contain a URL to a web page
    spam: (content) => {
        return (0, urlRegex_1.default)(content);
    },
};
exports.default = METRICS;
//# sourceMappingURL=metrics.js.map