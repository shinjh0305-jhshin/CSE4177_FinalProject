const mongoose = require("mongoose");
const { Schema } = mongoose;

const dealSchema = new Schema({
  grossArea: Number, //공급면적
  exclusiveArea: Number, //전용면적
  articleNo: String, //일련번호
  floor: String, //층
  story: String, //전체층
  formattedPrice: String, //매매가(1억 7,000)
  price: Number, //매매가(1.7)
  latitude: String, //위도
  longitude: String, //경도
  warrant: Number, //기보증금
  rent: Number, //월세
});

function Deal(mongoConnect) {
  return mongoConnect.model("deal", dealSchema);
}

module.exports = Deal;