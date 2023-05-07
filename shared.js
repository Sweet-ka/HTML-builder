const fs = require("fs/promises");
const path = require("path");

module.exports = {
  read: async function (root, dirName, fileName) {
    return fs.readFile(path.join(root, dirName, fileName), "utf8", function (error) {
      if (error) throw error;
    });
  },

  apend: async function (root, dirName, fileName, str) {
    return fs.appendFile(path.join(root, dirName, fileName), str + "\n", (error) => {
      if (error) throw error;
    });
  },

  getFiles: async function (root, dirName) {
    return fs.readdir(path.join(root, dirName), (error) => {
      if (error) throw error;
    });
  },

  getStats: async function (root, dirName, fileName) {
    return fs.stat(path.join(root, dirName, fileName), (error) => {
      if (error) throw error;
    });
  },

  createFile: async function (root, dirName, fileName, flag, template) {
    return fs.open(path.join(root, dirName, fileName), flag, template, (error) => {
      if (error) throw error;
    });
  },
};
