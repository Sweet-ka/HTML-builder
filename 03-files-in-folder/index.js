const path = require("path");
const { getFiles, getStats } = require("../shared");
const folderName = "secret-folder";

getInfo();

async function getInfo() {
  const files = await getFiles(__dirname, folderName);
  files.forEach(async (file) => {
    const statsFile = await getStats(__dirname, folderName, file);
    if (statsFile.isFile()) {
      const base = path.basename(file, path.extname(file));
      const ext = path.extname(file).substring(1);
      const size = statsFile.size / 1000;
      console.log(`${base} - ${ext} - ${size}kB`);
    }
  });
}
