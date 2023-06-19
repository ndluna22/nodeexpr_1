const fs = require("fs");
const http = require("http");
const https = require("https");
const url = require("url");

const get = (urlStr) => {
  return new Promise((resolve, reject) => {
    const protocol = url.parse(urlStr).protocol === "https:" ? https : http;
    protocol
      .get(urlStr, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const saveHtml = (urlStr) => {
  return get(urlStr)
    .then((html) => {
      const hostname = url.parse(urlStr).hostname;
      const filename = `${hostname}.html`;
      fs.writeFile(filename, html, (err) => {
        if (err) {
          console.error(`Couldn't write to ${filename}: ${err}`);
        } else {
          console.log(`Wrote to ${filename}`);
        }
      });
    })
    .catch((err) => {
      console.error(`Couldn't download ${urlStr}: ${err}`);
    });
};

const main = () => {
  if (process.argv.length !== 3) {
    console.error("Usage: node urls.js FILENAME");
    process.exit(1);
  }
  const filename = process.argv[2];
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error(`Couldn't read ${filename}: ${err}`);
      process.exit(1);
    }
    const urls = data.split("\n").filter((urlStr) => urlStr !== "");
    Promise.all(urls.map((urlStr) => saveHtml(urlStr))).then(() => {
      console.log("All done!");
    });
  });
};

main();
