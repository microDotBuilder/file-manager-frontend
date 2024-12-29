import { FileManager } from "./file-manager.js";
import { FolderManager } from "./Folder-manager.js";

export async function createFolder(folderPath) {
  try {
    const manager = new FolderManager();
    return manager.getWatcher();
  } catch (err) {
    console.log(err);
  }
}

export async function testFile() {
  const manager = new FileManager("test.json");
  await manager.getData();
  //   console.log(JSON.stringify(manager.data, null, 2));
  const watcher = await createFolder("test-folder");
  watcher
    .on("add", (path) => {
      console.log(`File added: ${path}`);
    })
    .on("change", (path) => {
      console.log(`File changed: ${path}`);
    })
    .on("unlink", (path) => {
      console.log(`File removed: ${path}`);
    })
    .on("addDir", (path) => {
      console.log(`Folder added: ${path}`);
    })
    .on("unlinkDir", (path) => {
      console.log(`Folder removed: ${path}`);
    })
    .on("error", (error) => {
      console.error(`Watcher error: ${error}`);
    })
    .on("ready", () => {
      console.log("Initial scan complete. Ready for changes.");
    });
}
