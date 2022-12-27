const mongoose = require("mongoose");
const { Schema } = mongoose;

const dealSchema = new Schema(
  {
    localCode: String, //지역코드
    grossArea: Number, //공급면적(m^2)
    exclusiveArea: Number, //전용면적(m^2)
    grossPyeongArea: Number, //공급면적(평)
    exclusivePyeongArea: Number, //전용면적(평)
    articleNo: String, //일련번호
    floor: String, //층
    story: String, //전체층
    formattedPrice: String, //매매가(1억 7,000)
    price: Number, //매매가(1.7)
    latitude: String, //위도
    longitude: String, //경도
    warrant: Number, //기보증금
    rent: Number, //월세
    earning: Number, //수익률
  },
  {
    versionKey: false, //__v 필드 삭제
  }
);

function Deal(mongoConnect) {
  return mongoConnect.model("deal", dealSchema);
}

module.exports = Deal;
