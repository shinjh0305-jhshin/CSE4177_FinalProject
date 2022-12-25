const router = require("express").Router();
const localCode = require("../crawler/getLocalCode");
const crawlEstate = require("../crawler/estateCrawler");
const crawlDeal = require("../crawler/dealCrawler");
const upsertDeal = require("../crawler/upsertDeal");

router.get("*", async (req, res) => {
  const localInfo = await localCode(req.query);

  if (!localInfo) {
    res.send({
      status: "Fail",
      Message: "존재하지 않는 지역입니다.",
    });
    return;
  }
  const crawledData = await crawlEstate(localInfo.code);
  const filteredDeal = await crawlDeal(crawledData); //기보증금/월세가 있는 매물만 필터링

  res.send({
    status: "OK",
    items: filteredDeal.length,
    deal: filteredDeal,
  });

  await upsertDeal(filteredDeal, localInfo.code);
});

module.exports = router;
