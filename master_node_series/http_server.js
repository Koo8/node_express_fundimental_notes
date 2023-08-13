const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // any blocking code will block all users accessibility, so use async await 
    res.write("Welcome to the home page");
    res.end();
  } else if (req.url === "/about") {
    res.end("This is about the learning ");
  } else res.end("<html><h2>OOPS</h2></html>");
});

server.listen(5000);
