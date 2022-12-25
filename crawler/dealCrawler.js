//기보증금, 월세에 대한 크롤링 진행
//return : 기보증금, 월세가 포함된 deal의 정보 포맷팅은 나중에 한다
const axios = require("axios");
const _ = require("lodash");
const cheerio = require("cheerio");
const tokens = require("../assets/tokens");
const userAgent = require("../assets/userAgent");

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const crawlDeal = async (rawdata) => {
  // const resp = await axios.get(`https://new.land.naver.com/api/articles/2244042746?complexNo=`, {
  //   headers: {
  //     Referer: "https://new.land.naver.com/offices?ms=37.388052,126.653769,16&a=SG&b=A1&e=RETAIL",
  //     Host: "new.land.naver.com",
  //     "User-Agent":
  //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
  //     authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE2NzE4MDY4NDEsImV4cCI6MTY3MTgxNzY0MX0.jC_Shk9pwZb8OloFzOgemoAvOS_4Wt23w2GwLMkpxDc",
  //   },
  // });

  // try {
  //   const rent = resp.data.articlePrice.allRentPrice;
  //   const warrant = resp.data.articlePrice.allWarrantPrice;

  //   if (rent && warrant) {
  //     console.log(`✔ Rent: ${rent}, Warrant: ${warrant}`);
  //   }
  // } catch (error) {
  //   console.log(`😢 상품에 문제가 생겼습니다.`);
  // }

  let iterated = 0;
  let tokenIdx = 0;
  let userAgentIdx = 0;

  let total = 0;
  let yesPrice = 0;
  let noPrice = 0;

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
        console.log(`✔ Warrant : ${warrant} Rent : ${rent}`);
        yesPrice++;
      } else {
        console.log(`💥 ${deal.articleNo}번 상품은 보증금/월세가 없습니다.`);
        noPrice++;
      }
    } catch (error) {
      console.log(`😢 ${deal.articleNo}번 상품에 문제가 생겼습니다.`);
    }

    // tokenIdx = (tokenIdx + 1) % 4;
    // userAgentIdx = (userAgentIdx + 1) % 14;

    // try {
    //   const rent = resp.data.articlePrice.allRentPrice;
    //   const warrant = resp.data.articlePrice.allWarrantPrice;
    //   if (rent && warrant) {
    //     deal.warrant = warrant;
    //     deal.rent = rent;
    //     console.log(`✔ Rent: ${rent}, Warrant: ${warrant}`);
    //   } else {
    //     console.log(`💥 ${deal.articleNo}번 상품은 보증금/월세가 없습니다.`);
    //   }
    // } catch (error) {
    //   console.log(
    //     `😢 ${deal.articleNo}번 상품에 문제가 생겼습니다. Agent : ${userAgentIdx} Token: ${tokenIdx}`
    //   );
    // }
  });

  await Promise.all(promises);

  // _.forEach(rawdata, async function (deal) {
  //   const resp = await axios.get(
  //     `https://new.land.naver.com/api/articles/${deal.articleNo}?complexNo=`,
  //     {
  //       headers: {
  //         Referer:
  //           "https://new.land.naver.com/offices?ms=37.388052,126.653769,16&a=SG&b=A1&e=RETAIL",
  //         Host: "new.land.naver.com",
  //         "User-Agent": userAgent[userAgentIdx],
  //         authorization: `Bearer ${tokens[tokenIdx]}`,
  //       },
  //     }
  //   );
  //   tokenIdx = (tokenIdx + 1) % 4;
  //   userAgentIdx = (userAgentIdx + 1) % 14;
  //   // if (iterated >= 20) {
  //   //   tokenIdx = (tokenIdx + 1) % 4;
  //   //   iterated = 0;
  //   //   console.log(`👌 Token changed to ${tokenIdx}`);
  //   // }
  //   //sleep(5000);

  //   try {
  //     const rent = resp.data.articlePrice.allRentPrice;
  //     const warrant = resp.data.articlePrice.allWarrantPrice;

  //     if (rent && warrant) {
  //       deal.warrant = warrant;
  //       deal.rent = rent;
  //       console.log(`✔ Rent: ${rent}, Warrant: ${warrant}`);
  //     } else {
  //       console.log(`💥 ${deal.articleNo}번 상품은 보증금/월세가 없습니다.`);
  //     }
  //   } catch (error) {
  //     console.log(`😢 ${deal.articleNo}번 상품에 문제가 생겼습니다.`);
  //   }

  //   iterated++;
  // });

  console.log("👍 크롤링 완료");
  console.log(`전체 데이터 : ${total} 데이터 있음 : ${yesPrice} 데이터 없음 : ${noPrice}`);
};

module.exports = crawlDeal;
