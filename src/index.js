import dotenv from "dotenv";
import { FolderWatcher } from "./utils/helpers.js";

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

FolderWatcher();
