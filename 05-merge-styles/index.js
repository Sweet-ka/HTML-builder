const { copyExt } = require("../shared");
const folderName = "styles";
const fileName = "bundle.css";
const distFolder = "project-dist";

copyExt(__dirname, distFolder, folderName, fileName, "css");
