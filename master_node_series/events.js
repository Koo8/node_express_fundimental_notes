const EventEmitter = require("events");

// create an event instance
const cusEmitter = new EventEmitter();

cusEmitter.on("response", (thename, id) => {
  console.log(`received data from server ${thename} with id ${id} `);
});

cusEmitter.on("response", () => {
  console.log("more data received");
});
cusEmitter.emit("response", "John", 13);
