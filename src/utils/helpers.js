import { FileManager } from "./file-manager.js";
import { FolderManager } from "./Folder-manager.js";
import { test, createTree } from "./tree.js";
import fs from "fs";
import {
  LOCAL_MEMORY_TREE_UPDATE_INTERVAL,
  JSON_METADATA_UPDATE_INTERVAL,
} from "./consts.js";

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
  let instructions = [];
  let tree = [];
  // for the initial setup like at the start if there
  //are already any folders or files in the test folder

  const startinstructions = createTree();
  if (startinstructions.length > 0) {
    tree = test(startinstructions);
    console.log(JSON.stringify(tree, null, 2));
  }

  // update the local memory tree every minute
  // and write the instructions and tree to the output.txt file
  // for dev phase
  setInterval(async () => {
    console.log("RUNNING LOCAL MEMORY TREE UPDATE........");
    tree = test(instructions);
    if (fs.existsSync("local-memory-tree.txt")) {
      // make it async
      fs.appendFile(
        "local-memory-tree.txt",
        JSON.stringify(instructions, null, 2),
        (err) => {
          if (err) throw err;
          console.log("Data appended asynchronously!");
        }
      );
    } else {
      fs.writeFile(
        "local-memory-tree.txt",
        JSON.stringify(instructions, null, 2),
        (err) => {
          if (err) throw err;
          console.log("Data appended asynchronously!");
        }
      );
    }
    instructions = []; // empty the instructions array
  }, LOCAL_MEMORY_TREE_UPDATE_INTERVAL);

  setInterval(() => {
    console.log("RUNNING JSON METADATA UPDATE........");
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
  }, JSON_METADATA_UPDATE_INTERVAL);
  //   console.log(JSON.stringify(manager.data, null, 2));
  const watcher = await createFolder("test-folder");
  function shouldExcludePath(path) {
    return path.includes(".git/");
  }

  watcher
    .on("add", (path) => {
      if (!shouldExcludePath(path)) {
        instructions.push(`File added: ${path}`);
      }
    })
    .on("change", (path) => {
      if (!shouldExcludePath(path)) {
        instructions.push(`File changed: ${path}`);
      }
    })
    .on("unlink", (path) => {
      if (!shouldExcludePath(path)) {
        instructions.push(`File removed: ${path}`);
      }
    })
    .on("addDir", (path) => {
      if (!shouldExcludePath(path)) {
        instructions.push(`Folder added: ${path}`);
      }
    })
    .on("unlinkDir", (path) => {
      if (!shouldExcludePath(path)) {
        instructions.push(`Folder removed: ${path}`);
      }
    })
    .on("error", (error) => {
      console.error(`Watcher error: ${error}`);
    })
    .on("ready", () => {
      console.log("Initial scan complete. Ready for changes.");
    });
}
