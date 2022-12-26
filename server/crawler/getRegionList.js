//네이버 부동산의 regionList를 가져오는 모듈 (인천시 한정)
//한 번 만들어지면 더 이상 쓸 일 없는 모듈

const axios = require("axios");
const fs = require("fs");

let result = [];

async function getRegionList() {
  //인천 전체 데이터 가져온다.
  let division = await axios.get("https://new.land.naver.com/api/regions/list?cortarNo=2800000000");
  division = division.data.regionList;

  const promises = division.map(async (div, index) => {
    let region = await axios.get(
      `https://new.land.naver.com/api/regions/list?cortarNo=${div.cortarNo}`
    );

    const innerPromises = region.data.regionList.map((reg, index) => {
      const tempDivision = {};
      tempDivision.division = div.cortarName;
      tempDivision.region = reg.cortarName;
      tempDivision.code = reg.cortarNo;
      result.push(tempDivision);
    });
    await Promise.all(innerPromises);
  });
  await Promise.all(promises);
  return result;
}

const temp = new Promise((resolve, reject) => {
  resolve(getRegionList());
});
temp.then((val) => {
  fs.writeFile("incheon.json", JSON.stringify(val), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});
