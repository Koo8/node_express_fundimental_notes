const fs = require('fs');

console.log('start');
fs.readFile('./content/first.txt', 'utf-8', (err, result) => {
    if (err) return;
    const first = result;

    // inside this block : keep on reading next
    fs.readFile('./content/second.txt', 'utf-8', (err, result) => {
      if (err) return;
      const second = result;

      // inside this second block : after reading all files, write to a new file
      fs.writeFile(
        "./content/combined.txt",
        `Here is the combined text from first and second files: ${first}\n ${second}`,
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log("done with writing combined text.");
          }
        }
      );
    })
    
    
})

console.log("go back for new task")