const http = require("http");
const fs = require("fs").promises;

/**wrap promise around async function */
// const getText = (path) => {
//   return new Promise((resove, reject) => {
//       fs.readFile(path, "utf-8"
//           , (err, data) => {
//       if (err) reject(err);
//       else {
//         resove(data);
//       }
//     });
//   });
// };
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("starting");
    const start = async () => {
      // const first = await getText('./content/first.txt');
      const first = await fs.readFile("./content/first.txt");
      // const second = await getText('./content/second.txt');
      // const final = await new Promise((resolve, reject) => {
      //     fs.writeFile('./content/combinedagain.txt', `THIS IS FROM ASYNC AWAIT METHOD:  ${first} ${second}`, (err, data) => {
      //         if (err) reject(err);
      //         res.write(`writing to file ${data}`)
      //     }) })
      const second = await fs.readFile("./content/second.txt");
      await fs.writeFile(
        "./content/combinedwithpromisesAPI.txt",
        `FINALLY using fs.promises API, all async ReadFILE and writeFILE are wrapped by promises: ${first} ${second}`
      );
    };
    start();
    res.end(" finished");
  }
});

server.listen("5000", () => {
  console.log("listening to port 5000");
});
