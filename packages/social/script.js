import { Buffer } from "buffer";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import puppeteer from "puppeteer";

const templateFile = "./template.svg";
const resultDir = "../docs/public/social";
const dimensions = {
  width: 1200,
  height: 675,
};

const toKebabCase = (string) =>
  string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const h2 = (text) => `<h2 xmlns="http://www.w3.org/1999/xhtml">${text}</h2>`;
const h3 = (text) => `<h3 xmlns="http://www.w3.org/1999/xhtml">${text}</h3>`;

export const docsPath = path.join(process.cwd(), "../docs/docs");
export const sourcesPath = path.join(
  process.cwd(),
  "../tonfisk/src/components"
);

{
  /* <h3 xmlns="http://www.w3.org/1999/xhtml">
  /docs/components/
</h3>
<h2 xmlns="http://www.w3.org/1999/xhtml">
TextInput
</h2> */
}

export const docsFilePaths = fs
  .readdirSync(docsPath)
  .filter((path) => /\.mdx?$/.test(path));

export const componentsFilePaths = fs
  .readdirSync(sourcesPath)
  .filter((path) => /^[A-Z][a-zA-Z]+\.tsx/.test(path))
  .map((file) => file.split(".")[0]);

const files = [];

for (const doc of docsFilePaths) {
  const source = fs.readFileSync(path.join(docsPath, doc), "utf-8");
  const { data } = matter(source);
  files.push({
    name: toKebabCase(data.title.replace(/\s/g, "-")),
    content: [h2(data.title), h3(data.description)],
  });
}

for (const source of componentsFilePaths) {
  files.push({
    name: toKebabCase(source),
    content: [h3("/docs/components/"), h2(source)],
  });
}

const templateString = fs.readFileSync(templateFile, "utf8");

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport(Object.assign({ deviceScaleFactor: 1 }, dimensions));

if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
}

for (const file of files) {
  console.log(`Creating ${file.name}.png.`);
  const fileString = templateString.replace(
    "__TEXT__",
    file.content.join("\n")
  );

  const fileAsBase64 = Buffer.from(fileString).toString("base64");
  const svgUrl = `data:image/svg+xml;base64,${fileAsBase64}`;

  await page.goto(svgUrl);

  const options = {
    encoding: "binary",
    type: "png",
    path: `${resultDir}/${file.name}.png`,
  };
  await page.screenshot(options);
}

await browser.close();
