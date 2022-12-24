const mongoose = require("mongoose");
const { Schema } = mongoose;

const localCodeSchema = new Schema({
  division: String,
  region: String,
  code: String,
});

module.exports = mongoose.model("localCode", localCodeSchema);
