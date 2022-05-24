//read a big text file and send it to the client
const res = require("express/lib/response");
const fs = require("fs");
const server = require("http").createServer();
//listen to events
server.on("request", (req, res) => {
  //   //solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //STREAMS
  const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //     console.log("end of file");
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     console.log("File not found");
  //   });
  //Solution 3 PIPE OPERATOR
  //handle the speed of back preassure, res is the destination
  readable.pipe(res);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening....");
});
