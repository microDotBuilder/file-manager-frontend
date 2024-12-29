import path from "path";
import { fileURLToPath } from "url";
import { JSON_METADATA_UPDATE_INTERVAL } from "./consts.js";
import {
  loadPm2Ignore,
  generateMerkleTree,
} from "./merkel-tree/merkle-tree.js";
import fs from "fs";
import { storeOutput } from "./store-output.js";
import { formatTimeInterval } from "./misc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function FolderWatcher() {
  console.log("TESTING MERKLE TREE");
  const targetPath = path.join(__dirname, "../../", "test-folder");
  let ignoreFilePath = path.join(__dirname, "../../", "test-folder/.pm2ignore");

  // Add debug logging
  console.log("Looking for .pm2ignore at:", ignoreFilePath);

  if (!fs.existsSync(ignoreFilePath)) {
    console.log("Warning: .pm2ignore not found at expected path");
    // Optionally, try to find it in the test-folder
    const alternatePath = path.join(targetPath, ".pm2ignore");
    console.log("Trying alternate path:", alternatePath);
    if (fs.existsSync(alternatePath)) {
      ignoreFilePath = alternatePath;
    }
  }

  const ignoreContent = loadPm2Ignore(ignoreFilePath);
  console.log("Ignore content loaded ");
  console.log(
    "will run metadata update every",
    formatTimeInterval(JSON_METADATA_UPDATE_INTERVAL)
  );
  setInterval(() => {
    // Build the Merkle tree
    const tree = generateMerkleTree(targetPath, ignoreContent, targetPath);

    // Print the result
    storeOutput(tree, "merkle-tree.txt", "Data appended to MERKLE TREE");
    console.log("TESTING MERKLE TREE COMPLETED");
  }, JSON_METADATA_UPDATE_INTERVAL);
}
