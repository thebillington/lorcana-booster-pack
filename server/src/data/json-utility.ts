import fs from 'fs';

export class JsonUtilityClass {
    static async fetchJsonFromUrl<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Forsooth, a scourge upon our fetch quest: ' + response.statusText);
        }
        const jsonData: T = await response.json();
        return jsonData;
      }
}