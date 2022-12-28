<template>
  <main class="mt-5">
    <div class="container">
      <h1 class="text-center my-4">부동산 수익률 검색기</h1>
      <div class="row mt-5">
        <div class="col-md-2">
          <select class="form-select mb-2" v-model="_city">
            <option value="인천시">인천시</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select mb-2" v-model="_division" @change="resetRegion">
            <option v-for="(div, i) in division" :key="i" v-text="div" :value="i"></option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select mb-2" v-model="_region">
            <option
              v-for="(reg, i) in region[_division]"
              :key="i"
              v-text="reg"
              :value="i"
              :selected="i === _region"
            ></option>
          </select>
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-dark" id="searchButton" @click="fetchData">
            검색
          </button>
        </div>
        <div class="col-md-4">
          <div class="row">
            <div class="d-flex col-3 align-self-center justify-content-end">정렬기준</div>
            <div class="col-9 align-self-center">
              <select class="form-select" v-model="_sort">
                <option v-for="(srt, i) in sort" :key="i" v-text="srt" :value="i"></option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="d-inline-flex my-3">
        <div class="col-5">
          <el-switch
            v-model="value"
            active-text="제곱미터"
            inactive-text="평"
            @change="changeArea"
          />
        </div>
        <el-button :type="filterPriceButton" @click="filterPriceVisible = true">매매가</el-button>
        <el-button :type="filterAreaButton" @click="filterAreaVisible = true">전용면적</el-button>
        <el-button :type="filterEarningButton" @click="filterEarningVisible = true"
          >수익률</el-button
        >
      </div>

      <!-- 매매가 필터 시작 -->
      <el-dialog v-model="filterPriceVisible" title="매매가 설정" width="50%">
        <div class="slider-demo-block">
          <el-slider
            v-model="priceRange"
            range
            :step="0.5"
            :max="200"
            :format-tooltip="formatPrice"
            :marks="markPrice"
            @change="priceChange"
          />
        </div>
        <div class="mt-4 d-flex justify-content-center">
          <el-input-number v-model="priceRange[0]" :min="0" :max="200" @change="priceChange" />
          <div class="align-self-center ms-2">억원</div>
          <div class="align-self-center mx-5">~</div>
          <el-input-number v-model="priceRange[1]" :min="0" :max="200" @change="priceChange" />
          <div class="align-self-center ms-2">억원</div>
        </div>
        <div style="padding-top: 20px; font-weight: bold">
          최댓값을 200억원으로 설정하면 상한액 설정이 해제됩니다.
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button plain @click="resetpriceRange"> 초기화 </el-button>
            <el-button type="primary" @click="filterPriceVisible = false"> 확인 </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 매매가 필터 종료 -->

      <!-- 전용면적 필터 시작 -->
      <el-dialog v-model="filterAreaVisible" title="전용면적 설정(평)" width="30%">
        <div class="slider-demo-block">
          <el-slider
            v-model="areaRange"
            range
            :max="1000"
            :format-tooltip="formatArea"
            :marks="markArea"
            @change="areaChange"
          />
        </div>
        <div class="mt-4 d-flex justify-content-between">
          <el-input-number v-model="areaRange[0]" :min="0" :max="1000" @change="areaChange" />
          <div class="align-self-center ms-2">평</div>
          <div class="align-self-center mx-5">~</div>
          <el-input-number v-model="areaRange[1]" :min="0" :max="1000" @change="areaChange" />
          <div class="align-self-center ms-2">평</div>
        </div>
        <div style="padding-top: 20px; font-weight: bold">
          최댓값을 1000평으로 설정하면 상한면적 설정이 해제됩니다.
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button plain @click="resetAreaRange"> 초기화 </el-button>
            <el-button type="primary" @click="filterAreaVisible = false"> 확인 </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 전용면적 필터 종료 -->

      <!-- 수익률 필터 시작 -->
      <el-dialog v-model="filterEarningVisible" title="수익률 설정(%)" width="30%">
        <div class="slider-demo-block">
          <el-slider
            v-model="earningRange"
            range
            :max="10"
            :step="0.1"
            :format-tooltip="formatEarning"
            :marks="markEarning"
            @change="earningChange"
          />
        </div>
        <div class="mt-4 d-flex justify-content-between">
          <el-input-number v-model="earningRange[0]" :min="0" :max="10" @change="earningChange" />
          <div class="align-self-center ms-2">%</div>
          <div class="align-self-center mx-5">~</div>
          <el-input-number v-model="earningRange[1]" :min="0" :max="10" @change="earningChange" />
          <div class="align-self-center ms-2">%</div>
        </div>
        <div style="padding-top: 20px; font-weight: bold">
          최댓값을 10%로 설정하면 상한수익률 설정이 해제됩니다.
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button plain @click="resetEarningRange"> 초기화 </el-button>
            <el-button type="primary" @click="filterEarningVisible = false"> 확인 </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 수익률 필터 종료 -->

      <div>
        <el-table v-loading="loading" stripe :data="tableData" height="450" style="width: 100%">
          <el-table-column prop="formattedPrice" label="매매가" width="150" />
          <el-table-column :prop="grossArea" label="공급면적" width="130" />
          <el-table-column :prop="exclusiveArea" label="전용면적" width="130" />
          <el-table-column
            prop="floor"
            label="층"
            width="80"
            :filters="floorFilters"
            :filter-method="floorFilterHandler"
          />
          <el-table-column prop="story" label="전체층" width="80" />
          <el-table-column prop="warrant" label="기보증금(만원)" width="180" />
          <el-table-column prop="rent" label="월세(만원)" width="180" />
          <el-table-column prop="earning" label="수익률(%)" width="180" />
          <el-table-column prop="articleNo" label="링크">
            <template #default="scope">
              <el-button size="small" @click="gotoLink(scope.row.articleNo)"
                >네이버 부동산</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, reactive } from "vue";
import { division, region, sort } from "@/dropDown.js";
import { axiosGet, axiosPost } from "../tools/axios";
import { uniq } from "lodash";

const _city = "인천시";
const _division = ref(0);
const _region = ref(0);
const _sort = ref(0);
const value = ref(true);
const loading = ref(false);
const filterPriceVisible = ref(false);
const filterAreaVisible = ref(false);
const filterEarningVisible = ref(false);
const filterPriceButton = ref("");
const filterAreaButton = ref("");
const filterEarningButton = ref("");
const grossArea = ref("grossArea"); //평 <-> m^2
const exclusiveArea = ref("exclusiveArea"); //평 <-> m^2
let priceRange = ref([0, 200]); //매매가 필터링 데이터
let areaRange = ref([0, 1000]); //공급면적 필터링 데이터
let earningRange = ref([0, 10]); //수익률 필터링 데이터
let tableData = reactive([]); //사용자에게 표시 될 데이터
let floorFilters = reactive([]);
const markPrice = reactive({
  //필터링 가이드
  0: "0억",
  10: "10억",
  20: "20억",
  30: "30억",
  40: "40억",
  50: "50억",
  60: "60억",
  70: "70억",
  80: "80억",
  90: "90억",
  100: "100억",
  120: "120억",
  140: "140억",
  160: "160억",
  180: "180억",
  200: "200억~",
});
const markArea = reactive({
  0: "0평",
  200: "200평",
  400: "400평",
  600: "600평",
  800: "800평",
  1000: "1000평~",
});
const markEarning = reactive({
  0: "0%",
  1: "1%",
  2: "2%",
  3: "3%",
  4: "4%",
  5: "5%",
  6: "6%",
  7: "7%",
  8: "8%",
  9: "9%",
  10: "10%~",
});

const sortby_name = ["earning", "price", "exclusiveArea"];
const sortorder_name = ["desc", "asc"];

function resetRegion() {
  _region.value = 0;
}

function fetchData() {
  if (_division.value == 0) {
    alert("지역을 다시 확인해주세요.");
    return;
  }

  const params = {}; //fetch parmas

  params.division = division[_division.value];
  params.region = region[_division.value][_region.value];
  params.sortby = sortby_name[Math.floor(_sort.value / 2)];
  params.sortorder = sortorder_name[_sort.value % 2];

  if (filterPriceButton.value != "") {
    params.pricemin = priceRange.value[0] * 10000;
    params.pricemax = priceRange.value[1] * 10000;
  }
  if (filterAreaButton.value != "") {
    params.areamin = areaRange.value[0];
    params.areamax = areaRange.value[1];
  }
  if (filterEarningButton.value != "") {
    params.earningmin = earningRange.value[0];
    params.earningmax = earningRange.value[1];
  }

  loading.value = true;
  console.log(params);
  axiosGet("/api/deal/list", params, onFetchSuccess, onFetchFail);
}

async function onFetchSuccess(resp) {
  loading.value = false;
  console.log("😊 Success", resp);
  tableData = resp;

  let allFloors = [];
  floorFilters.length = 0;

  resp.forEach((x) => {
    allFloors.push(x.floor);
  });

  allFloors = uniq(allFloors);
  allFloors.sort();

  allFloors.map((x) => {
    floorFilters.push({
      text: `${x}층`,
      value: x,
    });
  });
}

function onFetchFail(resp) {
  loading.value = false;
  console.log("🤢 Fail", resp);
}

function changeArea() {
  grossArea.value = grossArea.value === "grossArea" ? "grossPyeongArea" : "grossArea";
  exclusiveArea.value =
    exclusiveArea.value === "exclusiveArea" ? "exclusivePyeongArea" : "exclusiveArea";
}

function formatPrice(price) {
  //슬라이드를 옮길 때 표시 될 정보
  return `${price}억${price === 200 ? " ~" : ""}`;
}

function formatArea(area) {
  //슬라이드를 옮길 때 표시 될 정보
  const metric = Math.floor((area / 0.3025) * 10) / 10;
  return `${area}평(${metric}㎡)${area === 1000 ? " ~" : ""}`;
}

function formatEarning(earning) {
  //슬라이드를 옮길 때 표시 될 정보
  return `${earning}%${earning === 10 ? " ~" : ""}`;
}

function resetpriceRange() {
  //사용자가 매매가 필터를 초기화할 때 사용할 함수
  priceRange.value = [0, 200];
  filterPriceButton.value = "";
}

function resetAreaRange() {
  //사용자가 전용면적 필터를 초기화할 때 사용할 함수
  areaRange.value = [0, 1000];
  filterAreaButton.value = "";
}

function resetEarningRange() {
  //사용자가 수익률 필터를 초기화할 때 사용할 함수
  earningRange.value = [0, 10];
  filterEarningButton.value = "";
}

function priceChange() {
  if (priceRange.value[1] < priceRange.value[0]) {
    priceRange.value = [priceRange.value[1], priceRange.value[0]];
  }
  if (priceRange.value[1] - priceRange.value[0] === 200) {
    filterPriceButton.value = "";
  } else filterPriceButton.value = "primary";
}

function areaChange() {
  if (areaRange.value[1] < areaRange.value[0]) {
    areaRange.value = [areaRange.value[1], areaRange.value[0]];
  }
  if (areaRange.value[1] - areaRange.value[0] === 1000) {
    filterAreaButton.value = "";
  } else filterAreaButton.value = "primary";
}

function earningChange() {
  if (earningRange.value[1] < earningRange.value[0]) {
    earningRange.value = [earningRange.value[1], earningRange.value[0]];
  }
  if (earningRange.value[1] - earningRange.value[0] === 10) {
    filterEarningButton.value = "";
  } else filterEarningButton.value = "primary";
}

function floorFilterHandler(value, row, column) {
  const property = column["property"];
  return row[property] === value;
}

function gotoLink(no) {
  window.open(`https://m.land.naver.com/article/info/${no}`, "_blank");
}
</script>

<style scoped>
#searchButton {
  width: 80%;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.slider-demo-block {
  margin-right: 10px;
  margin-bottom: 30px;
}
</style>
