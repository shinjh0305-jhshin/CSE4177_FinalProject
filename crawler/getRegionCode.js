const connectMongoDB = require("../tools/db");
const localCodeModel = require("../model/localCodeModel");

// //save 코드. 절대 삭제 금지!!!
// const main = async () => {
//   const mongoose = connectMongoDB();
//   const Local = localCodeModel(mongoose);
//   const _data = {
//     division: "재현신",
//     region: "재현신",
//     code: "01099211569",
//   };
//   const new_data = new Local(_data);
//   const t = await new_data.save();
//   console.log(t);
//   //const res = await Local.findOne({ division: "미추홀구", region: "관교동" }).lean();
//   //console.log(res);
// };

const main = async () => {
  const mongoose = connectMongoDB();
  const Local = localCodeModel(mongoose);
  const res = await Local.findOne({ division: "연수구", region: "송도동" }).lean();
  console.log("연수구 송도동의 고유 번호 : " + res.code);
  mongoose.connection.close();
};

main();
//mongoose.connection.close();
