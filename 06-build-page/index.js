const fs = require("fs/promises");
const path = require("path");
const { read, createDir, createFile, apend, copyExt, copyDir, clearDir } = require("../shared");
const templateFileName = "template.html";
const componentFolder = "components";
const distFolder = "project-dist";

build();

async function build() {
  let templateStr = await read(__dirname, "", templateFileName);
  const regexp = new RegExp(/{{.*?}}/g);
  const articles = templateStr.match(regexp);

  for (let article of articles) {
    const componentName = article.substring(2, article.length - 2) + ".html";
    const component = await read(__dirname, componentFolder, componentName);
    const reg = new RegExp(`${article}`, "g");
    templateStr = templateStr.replace(reg, component);
  }
  await createDir(__dirname, distFolder, true);
  const fileOpened = await createFile(__dirname, distFolder, "index.html", "w");
  await apend(__dirname, distFolder, "index.html", templateStr);
  fileOpened.close();

  await copyExt(__dirname, distFolder, "styles", "style.css", "css");
  await clearDir(__dirname, path.join(distFolder, "assets"));
  await copyDir(__dirname, "assets", path.join(distFolder, "assets"), true);
}
