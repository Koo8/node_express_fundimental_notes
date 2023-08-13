/** TO show the data transfer difference when using ReadFileSync vs. CreateReadStream */

const http = require("http");
const fs = require("fs");

//create a server, immediately upload data from txt file when activated.
http
  .createServer((request, response) => {
    //1 **the network - size is 1.9MB, in header, content is 190000, it's bad to send data this big all together
    // const text = fs.readFileSync('./content/bigfile.txt', 'utf8')
    // response.end(text)

    //2 network-localhost-header-transfer-encoding: chunked, instead of 1900000 in content, although Size is 1.9MB same
    const fileStream = fs.createReadStream("./content/bigfile.txt", "utf-8");
    fileStream.on("open", () => {
      fileStream.pipe(response); // when open event starts, write to response
    });
    fileStream.on("error", (error) => {
      response.end(error);
    });
  })
  .listen("5000", () => console.log(`listing...5000`));
