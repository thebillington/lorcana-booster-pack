import fs from 'fs';
import { json } from 'stream/consumers';

export class JsonUtilityClass {
    static readJsonFromFile<T>(filePath: string) : Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }
                try{
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    reject(parseError)
                }
            })
        })
    }
}