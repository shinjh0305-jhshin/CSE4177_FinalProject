const express = require("express");
const morgan = require("morgan");
const crawlerRouter = require("./routes/crawlerRouter");
const app = express();

app.use(morgan("dev"));
app.use("/crawler", crawlerRouter);

app.listen(8080, () => {
  console.log("✔ Server running on 8080");
});
