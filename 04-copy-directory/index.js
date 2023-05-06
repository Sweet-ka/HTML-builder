const fs = require("fs/promises");
const path = require("path");
const folderName = "files";
const copyFolderName = "files-copy";

copyDir(folderName, copyFolderName);

async function copyDir(dir, copy) {
  await createDir(copy);
  const innerFiles = await getFiles(dir);

  for (let file of innerFiles) {
    const statsFile = await getStats(file);
    if (statsFile.isFile()) {
      await copyFiles(path.join(__dirname, folderName, file), path.join(__dirname, copy, file));
    } else {
    }
  }
}

async function createDir(copyDir) {
  const pathDir = path.join(__dirname, copyDir);
  return fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

async function getFiles(folderName) {
  return fs.readdir(path.join(__dirname, folderName), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function getStats(file) {
  return fs.stat(path.join(__dirname, folderName, file), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function copyFiles(file, newFile) {
  await fs.copyFile(file, newFile, undefined, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
