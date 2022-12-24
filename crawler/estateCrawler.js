const axios = require("axios");

axios
  .get(
    "https://new.land.naver.com/api/articles?cortarNo=2818510600&order=rank&realEstateType=SG&tradeType=A1&tag=%3A%3A%3A%3A%3A%3A%3A%3A&rentPriceMin=0&rentPriceMax=900000000&priceMin=0&priceMax=900000000&areaMin=0&areaMax=900000000&oldBuildYears&recentlyBuildYears&minHouseHoldCount&maxHouseHoldCount&showArticle=false&sameAddressGroup=false&minMaintenanceCost&maxMaintenanceCost&priceType=RETAIL&directions=&page=30&articleState",
    {
      headers: {
        Referer: "https://new.land.naver.com/offices?ms=37.388052,126.653769,16&a=SG&b=A1&e=RETAIL",
        Host: "new.land.naver.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE2NzE4MDY4NDEsImV4cCI6MTY3MTgxNzY0MX0.jC_Shk9pwZb8OloFzOgemoAvOS_4Wt23w2GwLMkpxDc",
      },
    }
  )
  .then((resp) => {
    console.log(resp.data.articleList);
  })
  .catch((resp) => {
    console.log(resp);
  });
