const router = require("express").Router();
const localCode = require("../crawler/getLocalCode");

router.get("*", async (req, res) => {
  const code = await localCode(req.query);

  res.send(code);
});

module.exports = router;
