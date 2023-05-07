const path = require("path");
const { getStats, getFiles, createDir, copyFiles } = require("../shared");
const folderName = "files";
const copyFolderName = "files-copy";

copyDir(folderName, copyFolderName);

async function copyDir(dir, copy) {
  await createDir(__dirname, copy, true);
  const innerFiles = await getFiles(__dirname, dir);

  for (let file of innerFiles) {
    const statsFile = await getStats(__dirname, folderName, file);
    if (statsFile.isFile()) {
      await copyFiles(path.join(__dirname, folderName, file), path.join(__dirname, copy, file));
    } else {
    }
  }
}
