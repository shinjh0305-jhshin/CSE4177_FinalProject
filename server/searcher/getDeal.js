//크롤링 된 부동산 매물을 mongodb에서 가져오는 모듈

const connectMongoDB = require("../tools/db");
const dealModel = require("../model/dealModel");

const getDeals = async (localCode, sort) => {
  const mongoose = connectMongoDB();
  const Deal = dealModel(mongoose);

  let queryParams = {};

  //인천시 OOO구 전체를 검색하는 쿼리를 날릴 때, localCode를 정규표현식으로 바꾼다
  let localRegexCode = localCode;
  if (localCode.slice(5) === "00000") {
    localRegexCode = localCode.slice(0, 5) + "[0-9]{5}";
  }
  queryParams.localCode = { $regex: localRegexCode };

  //필터 값이 넘어온 부분을 처리해준다
  if (sort.pricemax) {
    queryParams.price = { $gte: sort.pricemin, $lte: sort.pricemax };
  }
  if (sort.areamax) {
    queryParams.exclusivePyeongArea = { $gte: sort.areamin, $lte: sort.areamax };
  }
  if (sort.earningmax) {
    queryParams.earning = { $gte: sort.earningmin, $lte: sort.earningmax };
  }

  let sortParams = {};
  sortParams[sort.sortby] = sort.sortorder;

  const res = await Deal.find(queryParams).sort(sortParams).lean();

  return res;
};

module.exports = getDeals;
