const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

function connectMongoDB() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("😊 Mongoose is connected");
    })
    .catch((error) => console.error(error));

  return mongoose;
}

module.exports = connectMongoDB;
