const { copyDir } = require("../shared");
const folderName = "files";
const copyFolderName = "files-copy";

copyDir(__dirname, folderName, copyFolderName, true);
