// import axios from "axios";
// import { getTestTypescriptFile } from "./utils/misc.js";
import { testFile } from "./utils/helpers.js";
import dotenv from "dotenv";
// import { test } from "./utils/tree.js";
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

// console.log("Starting file upload test...");

// testBackend();
testFile();
// const lines = [
//   "Folder added: /Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend/test-folder/test",
//   "File added: /Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend/test-folder/test/test.js",
// ];

// const tree1 = test(lines);
// console.log("Tree 1");
// console.log(JSON.stringify(tree1, null, 2));
// const line2 = [
//   "Folder added: /Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend/test-folder/test2",
//   "File added: /Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend/test-folder/test2/test2.js",
//   "Folder added: /Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend/test-folder/test2/test3",
//   "File added: /Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend/test-folder/test2/test3/test3.js",
// ];
// console.log("Tree 2");
// const tree2 = test(line2);
// console.log(JSON.stringify(tree2, null, 2));
