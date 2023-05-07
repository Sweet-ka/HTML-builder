const fsStream = require("fs");
const fs = require("fs/promises");
const path = require("path");

async function read(root, dirName, fileName) {
  return new Promise((resolve) => {
    const stream = fsStream.createReadStream(path.join(root, dirName, fileName), {
      encoding: "utf8",
      autoClose: true,
      emitClose: true,
    });
    stream.on("data", (data) => {
      resolve(data);
    });
  });
}

async function apend(root, dirName, fileName, str) {
  return fs.appendFile(path.join(root, dirName, fileName), str + "\n", (error) => {
    if (error) throw error;
  });
}

async function getFiles(root, dirName) {
  return fs.readdir(path.join(root, dirName), (error) => {
    if (error) throw error;
  });
}

async function getStats(root, dirName, fileName) {
  return fs.stat(path.join(root, dirName, fileName), (error) => {
    if (error) throw error;
  });
}

async function createFile(root, dirName, fileName, flag, template) {
  return fs.open(path.join(root, dirName, fileName), flag, template, (error) => {
    if (error) throw error;
  });
}

async function createDir(root, dirName, recursive) {
  return fs.mkdir(path.join(root, dirName), { recursive: recursive }, (error) => {
    if (error) throw error;
  });
}

async function copyFiles(file, newFile, template) {
  await fs.copyFile(file, newFile, template, (error) => {
    if (error) throw error;
  });
}

async function copyExt(root, distFolder, folderName, fileName, ext) {
  const fileOpened = await createFile(root, distFolder, fileName, "w");
  const innerFiles = await getFiles(root, folderName);

  for (let file of innerFiles) {
    const statsFile = await getStats(root, folderName, file);
    if (statsFile.isFile() && path.extname(file) === `.${ext}`) {
      const data = await read(root, folderName, file);
      await apend(root, distFolder, fileName, data);
    }
  }
  fileOpened.close();
}

async function copyDir(root, folderName, copy, recursive) {
  await createDir(root, copy, recursive);
  const innerFiles = await getFiles(root, folderName);

  for (let file of innerFiles) {
    const statsFile = await getStats(root, folderName, file);
    if (statsFile.isFile()) {
      await copyFiles(path.join(root, folderName, file), path.join(root, copy, file));
    } else {
      await copyDir(root, path.join(folderName, file), path.join(copy, file), true);
    }
  }
}

module.exports = {
  read: read,
  apend: apend,
  getFiles: getFiles,
  getStats: getStats,
  createFile: createFile,
  createDir: createDir,
  copyFiles: copyFiles,
  copyExt: copyExt,
  copyDir: copyDir,
};
