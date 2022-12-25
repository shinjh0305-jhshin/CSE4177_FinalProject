//기보증금, 월세에 대한 크롤링 진행
//return : 기보증금, 월세가 포함된 deal의 정보 포맷팅은 나중에 한다
const axios = require("axios");
const _ = require("lodash");
const tokens = require("../assets/tokens");

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

  _.forEach(rawdata, async function (deal) {
    const resp = await axios.get(
      `https://new.land.naver.com/api/articles/${deal.articleNo}?complexNo=`,
      {
        headers: {
          Referer:
            "https://new.land.naver.com/offices?ms=37.388052,126.653769,16&a=SG&b=A1&e=RETAIL",
          Host: "new.land.naver.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
          authorization: `Bearer ${tokens[tokenIdx]}`,
        },
      }
    );
    tokenIdx = (tokenIdx + 1) % 4;
    // if (iterated >= 20) {
    //   tokenIdx = (tokenIdx + 1) % 4;
    //   iterated = 0;
    //   console.log(`👌 Token changed to ${tokenIdx}`);
    // }
    //sleep(5000);

    try {
      const rent = resp.data.articlePrice.allRentPrice;
      const warrant = resp.data.articlePrice.allWarrantPrice;

      if (rent && warrant) {
        deal.warrant = warrant;
        deal.rent = rent;
        console.log(`✔ Rent: ${rent}, Warrant: ${warrant}`);
      } else {
        console.log(`💥 ${deal.articleNo}번 상품은 보증금/월세가 없습니다.`);
      }
    } catch (error) {
      console.log(`😢 ${deal.articleNo}번 상품에 문제가 생겼습니다.`);
    }

    iterated++;
  });
};

crawlDeal();

module.exports = crawlDeal;
