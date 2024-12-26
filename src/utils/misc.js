import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTestFile = async () => {
  try {
    // Get the absolute path to the test.jpg in assets folder
    const assetPath = path.join(__dirname, "../assets/test.jpg");
    const buffer = await fs.readFile(assetPath);

    // Create a File object from the buffer
    const file = new File([buffer], "test.jpg", { type: "image/jpeg" });
    return file;
  } catch (error) {
    console.error("Error reading test file:", error);
    throw error;
  }
};

export const getTestFileText = async () => {
  const assetPath = path.join(__dirname, "../assets/test.txt");
  const buffer = await fs.readFile(assetPath);
  return buffer.toString();
};

export const getTestTypescriptFile = async () => {
  const assetPath = path.join(__dirname, "../assets/img.ts");
  const buffer = await fs.readFile(assetPath);
  return buffer.toString();
};
