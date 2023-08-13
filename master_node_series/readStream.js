// create a big data file for tesing on 'stream' module in node.js

// const { writeFileSync } = require('fs')

// for (let i = 0; i < 100000; i++){
//     writeFileSync('./content/bigfile.txt', `hello world ${i} \n`, {flag: 'a'});
// }

const { createReadStream } = require("fs");

// a ReadStream is created with following features
const stream = createReadStream("./content/bigfile.txt");
// default 64kb buffer
// last buffer : remained data
// highWaterMark: {highWaterMark:90000} for custom buffer size control
// {encoding:'utf8'} can be defined

// data event for read file
stream.on("data", (result) => {
  console.log(result); // multiple <Buffer...65486 more bytes> is logged before the last one with remained data
});

// catch err
stream.on("error", (err) => console.log(err));
