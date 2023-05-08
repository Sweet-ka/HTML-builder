const { copyExt, pipe } = require("../shared");
const folderName = "styles";
const fileName = "bundle.css";
const distFolder = "project-dist";

pipe(__dirname, distFolder, folderName, fileName, "css");
