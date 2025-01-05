// test-merkle.js
import { generateMerkleTree, loadPm2Ignore } from "./merkle-tree.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function testMerkleTree() {
  console.log("TESTING MERKLE TREE");
  const targetPath = path.join(__dirname, "../../../", "test-folder");
  let ignoreFilePath = path.join(__dirname, "../../../", ".pm2ignore");

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
  //   console.log("Ignore content loaded:", ignoreContent);

  // Build the Merkle tree
  const tree = generateMerkleTree(targetPath, ignoreContent, targetPath);

  // Print the result
  storeOutput(tree, "merkle-tree.txt", "Data appended to MERKLE TREE");
  console.log("TESTING MERKLE TREE COMPLETED");
}
