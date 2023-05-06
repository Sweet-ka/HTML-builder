const { read } = require("../shared");

const fileName = "text.txt";

readFile();

async function readFile() {
  const data = await read(__dirname, "", fileName);
  console.log("aaa", data);
}
