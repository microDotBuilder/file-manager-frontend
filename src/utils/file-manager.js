import fs from "fs/promises";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class FileManager {
  constructor(filename) {
    this.fileName = filename;

    this.filePath = path.join(__dirname, this.fileName);
    this.data = []; // this is going to have all the files and folders as json object
  }
  async #getFileData() {
    // this will read the JSON file and update the this.data
    try {
      const fileData = await fs.readFile(this.filePath, "utf8");
      this.data.push(JSON.parse(fileData));
    } catch (err) {
      console.error(err);
    }
  }
  async getData() {
    if (this.data.length === 0) {
      await this.#getFileData();
    }
    return this.data;
  }
  async #saveFileData() {
    // this will save the this.data to the JSON file
    await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
  }
  async saveData(data) {
    // we need to implement the logic to go into array to find the right data and update it
    // and then save the data to the file
    // await this.#saveFileData();
  }
}
