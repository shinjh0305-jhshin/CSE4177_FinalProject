const axios = require("axios");
const cheerio = require("cheerio");
const tokens = require("../assets/tokens");
const userAgent = require("../assets/userAgent");

let tokenIdx = 0;
let userAgentIdx = 0;

async function main() {
  const resp = await axios.get(`https://m.land.naver.com/article/info/2242958688?newMobile`);
  const $ = cheerio.load(resp.data);
  const script = $("script");
  const data = script[2].children[0].data.substring(11);
  const formatted = JSON.parse(data);
  const priceInfo = formatted.state.article.price;

  const warrant = priceInfo.allWarrantPrice;
  const rent = priceInfo.allRentPrice;

  console.log(`Warrant : ${warrant} Rent : ${rent}`);
}

main();
