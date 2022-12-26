//기보증금, 월세에 대한 크롤링 진행
//return : 기보증금, 월세가 포함된 deal의 정보 포맷팅은 나중에 한다
const axios = require("axios");
const cheerio = require("cheerio");

const crawlDeal = async (rawdata) => {
  let total = 0;
  let yesPrice = 0;
  let noPrice = 0;

  let result = [];

  const promises = rawdata.map(async (deal, index) => {
    try {
      const resp = await axios.get(
        `https://m.land.naver.com/article/info/${deal.articleNo}?newMobile`
      );
      const $ = cheerio.load(resp.data);
      const script = $("script");
      const data = script[2].children[0].data.substring(11);
      const formatted = JSON.parse(data);
      const priceInfo = formatted.state.article.price;

      const warrant = priceInfo.allWarrantPrice;
      const rent = priceInfo.allRentPrice;

      total++;
      if (warrant && rent) {
        //console.log(`✔ Warrant : ${warrant} Rent : ${rent}`);
        deal.warrant = warrant;
        deal.rent = rent;
        result.push(deal);
        yesPrice++;
      } else {
        //console.log(`💥 ${deal.articleNo}번 상품은 보증금/월세가 없습니다.`);
        noPrice++;
      }
    } catch (error) {
      console.log(`😢 ${deal.articleNo}번 상품에 문제가 생겼습니다.`);
    }
  });

  await Promise.all(promises);

  console.log("👍 크롤링 완료");
  //console.log(`전체 데이터 : ${total} 데이터 있음 : ${yesPrice} 데이터 없음 : ${noPrice}`);
  return result;
};

module.exports = crawlDeal;
