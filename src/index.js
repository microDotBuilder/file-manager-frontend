import dotenv from "dotenv";
import { FolderWatcher } from "./utils/helpers.js";
// import { exampleUsage } from "./utils/diff-generator/diff-generator.test.js";
import { diffTrees } from "./utils/diff-generator/diff-generator.js";
import { tree1, tree2 } from "./utils/mock/tree1.js";
import { storeOutput } from "./utils/store-output.js";
dotenv.config();

// async function testBackend() {
//   const API_URL = "http://localhost:8080/api/v1/upload";
//   const formData = new FormData();
//   formData.append("file", "this will be test file");

//   try {
//     const file = await getTestTypescriptFile();
//     const data = { file: file };
//     const response = await axios.post(`${API_URL}`, data);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// FolderWatcher();
function exampleUsage() {
  const oldTree = tree1;
  const newTree = tree2;

  // Compare the old vs. new
  const diff = diffTrees(oldTree, newTree, "root");

  console.log("Changes found:");
  const changes = diff.map((change) => JSON.stringify(change, null, 2));
  storeOutput(changes, "diff-generator-test.txt", {
    consoleMessage:
      "Changes found for diff generator are in  diff-generator-test.txt",
  });
  return changes;
}

exampleUsage();
