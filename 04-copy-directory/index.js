const { copyDir, clearDir } = require("../shared");
const folderName = "files";
const copyFolderName = "files-copy";

copy();

async function copy() {
  await clearDir(__dirname, copyFolderName);
  await copyDir(__dirname, folderName, copyFolderName, true);
}
