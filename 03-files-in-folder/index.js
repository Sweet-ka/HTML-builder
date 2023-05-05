const fs = require("fs/promises");
const path = require("path");
const folderName = "secret-folder";

getInfo();

async function getInfo() {
  const res = await getFiles();
  res.forEach(async (file) => {
    const statsFile = await getStats(file);
    if (statsFile.isFile()) {
      console.log(
        `${path.basename(file, path.extname(file))} - ${path.extname(file).substring(1)} - ${statsFile.size / 1000}kB`
      );
    }
  });
}

async function getFiles() {
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
