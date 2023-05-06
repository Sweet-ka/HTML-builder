const fs = require("fs/promises");
const path = require("path");

module.exports = {
  read: async function (root, dirName, fileName) {
    return fs.readFile(path.join(root, dirName, fileName), "utf8", function (error) {
      if (error) throw error;
    });
  },
};
