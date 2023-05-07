const readline = require("readline");
const { apend } = require("../shared");
const fileName = "text.txt";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

inputText("Введите текст: \n");

rl.on("close", () => {
  console.log("До новых встреч!");
});

function inputText(question) {
  rl.question(question, async (str) => {
    if (str === "exit") {
      rl.close();
      return;
    } else {
      await apend(__dirname, "", fileName, str);
      inputText("Введите еще текст: \n");
    }
  });
}
