"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUtilityClass = void 0;
var fs_1 = require("fs");
var JsonUtilityClass = /** @class */ (function () {
    function JsonUtilityClass() {
    }
    JsonUtilityClass.readJsonFromFile = function (filePath) {
        return new Promise(function (resolve, reject) {
            fs_1.default.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    var jsonData = JSON.parse(data);
                    resolve(jsonData);
                }
                catch (parseError) {
                    reject(parseError);
                }
            });
        });
    };
    return JsonUtilityClass;
}());
exports.JsonUtilityClass = JsonUtilityClass;
