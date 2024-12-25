import { getTestFile } from "../utils/misc";

export async function uploadDrive() {
  const currentDir = process.cwd();
  const filePath = `${currentDir}/src/assets/test.jpg`;
  const media = await getTestFile(filePath);
  // call our backend api to upload to drive
  // wait for the response
  // if success, return the file id
  // if failed, return an error
}
