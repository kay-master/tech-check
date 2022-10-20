"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
// import { parentPort } from "worker_threads";
const process_controller_1 = __importDefault(require("./controllers/process.controller"));
const metrics_1 = __importDefault(require("./plugs/metrics"));
// To add more metrics, please add them into the metrics object ./plugs/metrics
const METRICS = metrics_1.default;
function workFn(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const promised = new Promise((resolve) => {
            let results = [];
            const rl = readline_1.default.createInterface({
                input: fs_1.default.createReadStream(input.filePath),
                crlfDelay: Infinity,
            });
            rl.on("line", (line) => {
                const init = new process_controller_1.default(line, METRICS);
                const data = init.run();
                results = [...results, data];
            });
            rl.on("close", () => {
                resolve(results);
            });
        });
        return yield promised;
    });
}
function workPool(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield workFn(input);
        input.port.postMessage(results);
        return results;
    });
}
exports.default = workPool;
//# sourceMappingURL=worker.js.map