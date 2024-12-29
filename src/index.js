import dotenv from "dotenv";
import { FolderWatcher } from "./utils/helpers.js";
// import { exampleUsage } from "./utils/diff-generator/diff-generator.test.js";
import { diffTrees } from "./utils/diff-generator/diff-generator.js";
import { tree1, tree2 } from "./utils/mock/tree1.js";
import { applyDiff } from "./utils/tree-from-diff/tree-from-diff.js";
import { storeOutput } from "./utils/store-output.js";
import { diff } from "./utils/mock/diff.js";
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
// function exampleUsage() {
//   const oldTree = tree1;
//   const newTree = tree2;

//   // Compare the old vs. new
//   const diff = diffTrees(oldTree, newTree, "root");

//   console.log("Changes found:");

//   // Create a structured diff object
//   const diffOutput = {
//     timestamp: new Date().toISOString(),
//     summary: {
//       total: diff.length,
//       added: diff.filter((d) => d.changeType === "added").length,
//       removed: diff.filter((d) => d.changeType === "removed").length,
//       modified: diff.filter((d) => d.changeType === "modified").length,
//       unchanged: diff.filter((d) => d.changeType === "unchanged").length,
//     },
//     changes: diff.map((record) => ({
//       changeType: record.changeType,
//       path: record.path,
//       // Only include relevant node data based on change type
//       ...(record.oldNode && { oldNode: record.oldNode }),
//       ...(record.newNode && { newNode: record.newNode }),
//     })),
//   };

//   // Store the structured diff
//   storeOutput(diffOutput, "diff-generator-test.txt", {
//     consoleMessage:
//       "Changes found for diff generator are in diff-generator-test.txt",
//     append: false, // Overwrite the file instead of appending
//   });

//   return diffOutput;
// }

// exampleUsage();

function exampleUsage() {
  // 1) Sample oldTree (a minimal example)
  const oldTree = tree1;

  // 2) Sample diffObj (a minimal example)
  const diffObj = diff;

  // 3) Apply the changes array to our oldTree
  const updatedTree = applyDiff(oldTree, diffObj.changes);

  storeOutput(updatedTree, "updated-tree.txt", {
    consoleMessage: "Updated tree is in updated-tree.txt",
    append: false,
  });
}

exampleUsage();
