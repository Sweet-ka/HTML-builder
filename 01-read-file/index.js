const fs = require("fs");
const path = require("path");

const fileName = "text.txt";
const folderName = "01-read-file";

fs.readFile(path.join("./", folderName, fileName), "utf8", function (error, data) {
  if (error) throw error;
  console.log(data);
});
