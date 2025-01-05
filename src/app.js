import {
  JSON_METADATA_UPDATE_INTERVAL,
  JSON_METADATA_UPDATE_INTERVAL_MS_TEST_CASE,
} from "./utils/consts.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import {
  generateMerkleTree,
  loadPm2Ignore,
} from "./utils/merkel-tree/merkle-tree.js";
import { diffTrees } from "./utils/diff-generator/diff-generator.js";
import { API_SETUP_URI, API_UPDATE_URI } from "./api/endpoint.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let originalTree = null;

export async function app() {
  const targetPath = path.join(__dirname, "../", "test-folder");
  let ignoreFilePath = path.join(targetPath, ".pm2ignore");
  const ignoreContent = await getIgnoreContent(ignoreFilePath);

  runsetup(targetPath, ignoreContent);
  setInterval(async () => {
    await runUpdate(targetPath, ignoreContent);
  }, JSON_METADATA_UPDATE_INTERVAL_MS_TEST_CASE);
}

export async function runsetup(targetPath, ignoreContent) {
  // setStartup
  console.log("running setup.....");
  console.time("setup");
  // we will get the path from the user next

  const tree = await generateMerkleTree(targetPath, ignoreContent, targetPath);
  originalTree = tree;
  console.timeEnd("setup");
  // now we want to send this to our backend
  //api call
  await callSetupApi(tree);
}

export async function getIgnoreContent(ignoreFilePath) {
  if (!fs.existsSync(ignoreFilePath)) {
    console.log("Warning: .pm2ignore not found at expected path");
    // Optionally, try to find it in the test-folder
    const alternatePath = path.join(targetPath, ".pm2ignore");
    console.log("Trying alternate path:", alternatePath);
    if (fs.existsSync(alternatePath)) {
      ignoreFilePath = alternatePath;
    }
  }
  return await loadPm2Ignore(ignoreFilePath);
}

export async function runUpdate(targetPath, ignoreContent) {
  console.time("update");
  const tree = await generateMerkleTree(targetPath, ignoreContent, targetPath);
  // get the diff
  const diff = await getDiff(originalTree, tree);
  //   console.log(JSON.stringify(diff, null, 2));
  originalTree = tree;
  await callUpdateApi(diff);
  console.timeEnd("update");
}

export async function getDiff(originalTree, tree) {
  const diff = diffTrees(originalTree, tree, "root");

  console.log("Changes found:");

  // Create a structured diff object
  const diffOutput = {
    timestamp: new Date().toISOString(),
    summary: {
      total: diff.length,
      added: diff.filter((d) => d.changeType === "added").length,
      removed: diff.filter((d) => d.changeType === "removed").length,
      modified: diff.filter((d) => d.changeType === "modified").length,
      unchanged: diff.filter((d) => d.changeType === "unchanged").length,
    },
    changes: diff.map((record) => ({
      changeType: record.changeType,
      path: record.path,
      // Only include relevant node data based on change type
      ...(record.oldNode && { oldNode: record.oldNode }),
      ...(record.newNode && { newNode: record.newNode }),
    })),
  };

  return diffOutput;
}

export async function callSetupApi(tree) {
  const API_URL = API_SETUP_URI;

  const data = { file: tree };
  try {
    const response = await axios.post(`${API_URL}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export async function callUpdateApi(diff) {
  const API_URL = API_UPDATE_URI;
  const data = { diff: diff };
  console.log("got the diff", JSON.stringify(diff, null, 2));
  try {
    const response = await axios.post(`${API_URL}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}
