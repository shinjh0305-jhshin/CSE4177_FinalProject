//2억 7,000을 270000000으로 만들어주는 함수

function deformat(rawdata) {
  rawdata = rawdata.replace(",", "");

  let result = 0;
  const part = rawdata.split("억");
  if (part.length == 2) {
    result += part[0] * 10000;
    result += part[1] * 1;
  } else {
    result += part[0] * 1;
  }

  return result;
}

module.exports = deformat;
