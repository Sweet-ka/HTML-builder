const fs = require("fs");
const readline = require("node:readline");

const path = require("path");

const fileName = "text.txt";
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
      fs.appendFile(path.join(__dirname, fileName), str + "\n", (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      inputText("Введите еще текст: \n");
    }
  });
}
