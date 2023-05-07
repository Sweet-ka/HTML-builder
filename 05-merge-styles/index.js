const path = require("path");
const { getStats, apend, getFiles, createFile, read } = require("../shared");
const folderName = "styles";
const fileName = "bundle.css";
const distFolder = "project-dist";

copyStyles(folderName, fileName);

async function copyStyles(dir, fileName) {
  const fileOpened = await createFile(__dirname, distFolder, fileName, "w");
  const innerFiles = await getFiles(__dirname, dir);

  for (let file of innerFiles) {
    const statsFile = await getStats(__dirname, folderName, file);
    if (statsFile.isFile() && path.extname(file) === ".css") {
      const data = await read(__dirname, folderName, file);
      await apend(__dirname, distFolder, fileName, data);
    }
  }
  fileOpened.close();
}
