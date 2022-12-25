//크롤링에 필요한 localcode를 mongoDB에서 가져오는 모듈

const connectMongoDB = require("../tools/db");
const localCodeModel = require("../model/localCodeModel");

const localCode = async (localInfo) => {
  const mongoose = connectMongoDB();
  const Local = localCodeModel(mongoose);
  const res = await Local.findOne({
    division: localInfo.division,
    region: localInfo.region,
  }).lean();

  return res;
};

module.exports = localCode;
//mongoose.connection.close();
