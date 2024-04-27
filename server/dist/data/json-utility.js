"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUtilityClass = void 0;
const fs_1 = __importDefault(require("fs"));
class JsonUtilityClass {
    static readJsonFromFile(filePath) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const jsonData = JSON.parse(data);
                    console.log(jsonData);
                    resolve(jsonData);
                }
                catch (parseError) {
                    reject(parseError);
                }
            });
        });
    }
}
exports.JsonUtilityClass = JsonUtilityClass;
