import { FileManager } from "./file-manager.js";
import { FolderManager } from "./Folder-manager.js";
import { test, createTree } from "./tree.js";
import fs from "fs";
import { INTERVAL } from "./consts.js";

export async function createFolder(folderPath) {
  try {
    const manager = new FolderManager();
    return manager.getWatcher();
  } catch (err) {
    console.log(err);
  }
}

/**
 * after loading the data,
 * we are going to keep track of the changes in the folder
 * and then update the data array of json with the changes
 * the data that need to be stored in the data array will
 * will need to be trimmed from the file name itself.
 */

export async function testFile() {
  const manager = new FileManager("test.json");
  const data = await manager.getData();
  const instructions = [];
  let tree = [];
  // for the initial setup like at the start if there
  //are already any folders or files in the test folder

  const startinstructions = createTree();
  if (startinstructions.length > 0) {
    tree = test(startinstructions);
  }

  // update the local memory tree every minute
  // and write the instructions and tree to the output.txt file
  // for dev phase
  setInterval(async () => {
    tree = test(instructions);
    // check if the output.txt file exists
    if (fs.existsSync("output.txt")) {
      // make it async
      fs.appendFile("output.txt", JSON.stringify(tree, null, 2), (err) => {
        if (err) throw err;
        console.log("Data appended asynchronously!");
      });
    } else {
      fs.writeFile("output.txt", JSON.stringify(tree, null, 2), (err) => {
        if (err) throw err;
        console.log("Data appended asynchronously!");
      });
    }

    console.log("instruction added........");
  }, INTERVAL);
  //   console.log(JSON.stringify(manager.data, null, 2));
  const watcher = await createFolder("test-folder");
  watcher
    .on("add", (path) => {
      // console.log(`File added: ${path}`);
      instructions.push(`File added: ${path}`);
    })
    .on("change", (path) => {
      // console.log(`File changed: ${path}`);
      instructions.push(`File changed: ${path}`);
    })
    .on("unlink", (path) => {
      // console.log(`File removed: ${path}`);
      instructions.push(`File removed: ${path}`);
    })
    .on("addDir", (path) => {
      // console.log(`Folder added: ${path}`);
      instructions.push(`Folder added: ${path}`);
    })
    .on("unlinkDir", (path) => {
      // console.log(`Folder removed: ${path}`);
      instructions.push(`Folder removed: ${path}`);
    })
    .on("error", (error) => {
      console.error(`Watcher error: ${error}`);
    })
    .on("ready", () => {
      console.log("Initial scan complete. Ready for changes.");
    });
}
