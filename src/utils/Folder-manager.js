import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "../../", "test-folder");

export class FolderManager {
  constructor() {
    this.folderPath = folderPath;
    this.createFolder();
    this.watcher = chokidar.watch(this.folderPath, {
      persistent: true,
    });
  }

  createFolder() {
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath);
    }
  }
  async deleteFolder() {
    // this will delete the folder and all the files inside it recursively
    await fs.rmdir(this.folderPath, { recursive: true });
  }
  getWatcher() {
    return this.watcher;
  }
}
