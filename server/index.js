const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const crawlerRouter = require("./routes/crawlerRouter");
const dealRouter = require("./routes/dealRouter");
const app = express();

app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send({
    status: "OK",
    message: "Message from JaeHyun Shin",
  });
});
app.use("/crawler", crawlerRouter);
app.use("/deal", dealRouter);

app.listen(8080, () => {
  console.log("✔ Server running on 8080");
});
