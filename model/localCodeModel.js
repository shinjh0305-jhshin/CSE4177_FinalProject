const mongoose = require("mongoose");
const { Schema } = mongoose;

const localCodeSchema = new Schema({
  division: String,
  region: String,
  code: String,
});

function Local(mongoConnect) {
  return mongoConnect.model("localcode", localCodeSchema);
}

module.exports = Local;
