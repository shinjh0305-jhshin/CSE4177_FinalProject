//크롤링 된 부동산 매물을 mongodb에서 가져오는 모듈

const connectMongoDB = require("../tools/db");
const dealModel = require("../model/dealModel");

const getDeals = async (localCode, sort) => {
  const mongoose = connectMongoDB();
  const Deal = dealModel(mongoose);

  let sortParams = {};
  sortParams[sort.sortby] = sort.sortorder;

  const res = await Deal.find({
    localCode: localCode,
  })
    .sort(sortParams)
    .lean();

  return res;
};

module.exports = getDeals;
