const fs = require("fs");
const path = require("path");

const fileName = "text.txt";

fs.readFile(path.join(__dirname, fileName), "utf8", function (error, data) {
  if (error) throw error;
  console.log(data);
});
