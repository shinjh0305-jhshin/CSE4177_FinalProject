const router = require("express").Router();
const localCode = require("../crawler/getLocalCode");
const crawlEstate = require("../crawler/estateCrawler");
const crawlDeal = require("../crawler/dealCrawler");

router.get("*", async (req, res) => {
  const localInfo = await localCode(req.query);
  const crawledData = await crawlEstate(localInfo.code);
  await crawlDeal(crawledData);
  res.send("ok");
});

module.exports = router;
