import fs from "fs";
export async function uploadFile(drive) {
  const currentDir = process.cwd();
  const filePath = `${currentDir}/src/assets/test.jpg`;
  const media = fs.createReadStream(filePath);
  // call our backend api to upload to drive
  uploadToDrive(drive, media);
  // wait for the response
  // if success, return the file id
  // if failed, return an error
}

export async function uploadToDrive(drive, media) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "test.jpg",
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: media,
      },
      fields: "id",
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
