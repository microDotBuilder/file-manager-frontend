export async function getTestFile(filePath) {
  try {
    const file = fs.createReadStream(filePath);
    return file;
  } catch (err) {
    throw err;
  }
}
