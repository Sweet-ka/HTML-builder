const fs = require("fs");
const readline = require("node:readline");

const path = require("path");

const fileName = "text.txt";
const folderName = "02-write-file";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

inputText("Введите текст: \n");

rl.on("close", () => {
  console.log("До новых встреч!");
});

function inputText(question) {
  rl.question(question, (str) => {
    if (str === "exit") {
      rl.close();
      return;
    } else {
      fs.appendFile(path.join("./", folderName, fileName), str + "\n", (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      inputText("Введите еще текст: \n");
    }
  });
}
