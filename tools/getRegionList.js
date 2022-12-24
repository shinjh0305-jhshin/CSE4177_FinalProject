//네이버 부동산의 regionList를 가져오는 모듈 (인천시 한정)

const axios = require("axios");

let result = {};

async function getRegionList() {
  //인천 전체 데이터 가져온다.
  let division = await axios.get("https://new.land.naver.com/api/regions/list?cortarNo=2800000000");
  division = division.data.regionList;

  const promises = division.map(async (div, index) => {
    result[div.cortarName] = {};
    let region = await axios.get(`https://new.land.naver.com/api/regions/list?cortarNo=${div.cortarNo}`);

    const innerPromises = region.data.regionList.map((reg, index) => {
      result[div.cortarName][reg.cortarName] = reg.cortarNo;
    });
    await Promise.all(innerPromises);
  });

  await Promise.all(promises);

  //   for (let div of division) {
  //     result[div.cortarName] = {};
  //     let region = await axios.get(`https://new.land.naver.com/api/regions/list?cortarNo=${div.cortarNo}`);

  //     for (let reg of region.data.regionList) {
  //       result[div.cortarName][reg.cortarName] = reg.cortarNo;
  //     }
  //   }

  return result;

  //console.log(result);
  //return result;

  //   await axios
  //     .get()
  //     .then((resp) => {
  //       incheonDivison = resp.data.regionList;
  //     })
  //     .then(() => {
  //       incheonDivison.forEach((division) => {
  //         result[division.cortarName] = {};
  //         axios.get(`https://new.land.naver.com/api/regions/list?cortarNo=${division.cortarNo}`).then((resp) => {
  //           resp.data.regionList.forEach((region) => {
  //             result[division.cortarName][region.cortarName] = region.cortarNo;
  //           });
  //         });
  //       });
  //     });
  //   console.log(result);
  //   return result;
}

const temp = new Promise((resolve, reject) => {
  resolve(getRegionList());
});
temp.then((val) => {
  console.log(val);
});
