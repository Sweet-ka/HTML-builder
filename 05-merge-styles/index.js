const fs = require("fs/promises");
const path = require("path");
const folderName = "styles";
const fileName = "bundle.css";
const distFolder = "project-dist";

copyStyles(folderName, fileName);

async function copyStyles(dir, fileName) {
  const fileOpened = await createFile();

  const innerFiles = await getFiles(dir);

  for (let file of innerFiles) {
    const statsFile = await getStats(file);
    if (statsFile.isFile() && path.extname(file) === ".css") {
      const data = await read(folderName, file);
      await addFiles(distFolder, fileName, data);
    }
  }
  fileOpened.close();
}

async function createFile() {
  return fs.open(path.join(__dirname, distFolder, fileName), "w", undefined, (err) => {
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

async function addFiles(folderName, fileName, str) {
  return fs.appendFile(path.join(__dirname, folderName, fileName), str + "\n", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function read(folderName, fileName) {
  return fs.readFile(path.join(__dirname, folderName, fileName), "utf8", function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
}
