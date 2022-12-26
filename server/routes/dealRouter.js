const router = require("express").Router();
const localCode = require("../crawler/getLocalCode");
const getDeals = require("../searcher/getDeal");

router.get("/list", async (req, res) => {
  const region = req.query;
  const localInfo = await localCode(region);
  const deals = await getDeals(localInfo.code, region);
  res.send(deals);
});

module.exports = router;
