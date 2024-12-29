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

export const formatTimeInterval = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ${days === 1 ? "day" : "days"}`;
  if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
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
