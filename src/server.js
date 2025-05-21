const http = require("http");
const hostname = "localhost";
const port = 3000;
const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.end('<h1>Hello World 1223!</h1><hr>')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
