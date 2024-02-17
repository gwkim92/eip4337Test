//0xE18D14ACA0EbF2f039F1b203Af619960C114c4fE
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const userOperationRoutes = require("./src/routes/userOperationRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api", userOperationRoutes); // '/api' 경로를 기점으로 라우팅

app.listen(port, () => {
  console.log(`EIP-4337 Bundler server listening at http://localhost:${port}`);
});
