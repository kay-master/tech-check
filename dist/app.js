"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const metrics_1 = __importDefault(require("./plugs/metrics"));
const process_controller_1 = __importDefault(require("./controllers/process.controller"));
const combineData_1 = __importStar(require("./utils/combineData"));
console.log("\nAnalyzer is running ...\n\n");
// To add more metrics, please add them into the metrics object ./plugs/metrics
const METRICS = metrics_1.default;
const directoryPath = path_1.default.join(__dirname, "../docs");
function processFn() {
    return __awaiter(this, void 0, void 0, function* () {
        const promisedData = new Promise((resolve, reject) => {
            let results = [];
            let closedFiles = 0;
            fs_1.default.readdir(directoryPath, (error, files) => __awaiter(this, void 0, void 0, function* () {
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
                    const filePath = path_1.default.join(directoryPath, file);
                    const rl = readline_1.default.createInterface({
                        input: fs_1.default.createReadStream(filePath),
                        crlfDelay: Infinity,
                    });
                    rl.on("line", (line) => {
                        const init = new process_controller_1.default(line, METRICS);
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
            }));
        });
        return yield promisedData;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const start = performance.now();
        const data = yield processFn();
        if (data.error) {
            console.error(data.msg, data.error);
            console.log(`\nExecution time: ${(0, combineData_1.timeConvert)(performance.now() - start)} s\n`);
            return;
        }
        console.log("RESULTS\n=======");
        const results = (0, combineData_1.default)(data.results || []);
        Object.entries(results).forEach((result) => {
            console.log(`${result[0]} : ${result[1]}`);
        });
        console.log(`\nExecution time: ${(0, combineData_1.timeConvert)(performance.now() - start)} s\n`);
    }
    catch (error) {
        console.error(error);
    }
}))();
//# sourceMappingURL=app.js.map