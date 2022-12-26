const _ = require("lodash");
const connectMongoDB = require("../tools/db");
const dealModel = require("../model/dealModel");
const deformat = require("../tools/priceDeformatter");

//save 코드. 절대 삭제 금지!!!
const upsertDeal = async (deals, localCode) => {
  const mongoose = connectMongoDB();
  const Deal = dealModel(mongoose);

  let newData = [];

  //크롤링 된 지역에 해당되는 기존의 모든 데이터는 삭제한다
  await Deal.deleteMany({ localCode: localCode });

  const promises = deals.map(async (deal, index) => {
    const floorInfo = deal.floorInfo.split("/");
    deal.floor = floorInfo[0];
    deal.story = floorInfo[1];
    deal.price = deformat(deal.dealOrWarrantPrc);

    const renamedObject = _.mapKeys(deal, function (value, key) {
      switch (key) {
        case "area1":
          return "grossArea";
        case "area2":
          return "exclusiveArea";
        case "dealOrWarrantPrc":
          return "formattedPrice";
        default:
          return key;
      }
    });

    const earning = ((deal.rent * 12) / (deal.price - deal.warrant)) * 100;
    renamedObject.earning = Math.round(earning * 100) / 100;
    const finalObject = _.omit(renamedObject, ["floorInfo"]);

    newData.push(finalObject);
  });

  await Promise.all(promises);
  await Deal.create(newData);
};

module.exports = upsertDeal;
