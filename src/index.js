// import { uploadFile } from "./googledrive/upload-drive.js";
// import { google } from "googleapis";
import axios from "axios";
import { getTestTypescriptFile } from "./utils/misc.js";
import dotenv from "dotenv";
dotenv.config();
// async function testFileUpload() {
//   try {
//     // Get the test file from assets
//     const file = await getTestFile();
//     console.log("Test file loaded:", file.name);

//     // Create FormData
//     const formData = new FormData();
//     formData.append("file", file);

//     // Upload the file
//     const response = await fetch("http://localhost:8080/api/v1/upload", {
//       method: "POST",
//       body: JSON.stringify({ file: "test the file" }),
//     });

//     if (!response.ok) {
//       throw new Error(`Upload failed with status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("Upload successful! Server response:", result);

//     // Log the file details
//     console.log("\nFile upload details:");
//     console.log("-------------------");
//     console.log(`Original name: ${result.data.originalName}`);
//     console.log(`Size: ${result.data.size} bytes`);
//     console.log(`Type: ${result.data.mimetype}`);
//     console.log(`Server filename: ${result.data.fileName}`);
//   } catch (error) {
//     console.error("Upload failed:", error.message);
//   }
// }

async function testBackend() {
  const API_URL = "http://localhost:8080/api/v1/upload";
  const formData = new FormData();
  formData.append("file", "this will be test file");

  try {
    const file = await getTestTypescriptFile();
    const data = { file: file };
    const response = await axios.post(`${API_URL}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

console.log("Starting file upload test...");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );
// oauth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });
// const drive = google.drive({ version: "v3", auth: oauth2Client });
// // console.log(oauth2Client);
// uploadFile(drive);
// Run the test
// testFileUpload();
testBackend();
