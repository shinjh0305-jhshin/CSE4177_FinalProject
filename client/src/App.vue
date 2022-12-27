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
        <el-button type="info" @click="filterPriceVisible = true">매매가</el-button>
        <el-button type="primary">전용면적</el-button>
        <el-button type="primary">수익률</el-button>
      </div>

      <!-- 매매가 필터 -->
      <el-dialog v-model="filterPriceVisible" title="매매가 설정" width="30%">
        <div class="slider-demo-block">
          <el-slider
            v-model="priceRangeto10"
            range
            :step="0.1"
            :max="10"
            :format-tooltip="formatPriceto10"
            :marks="markto10"
            show-input
          />
        </div>
        <div class="slider-demo-block">
          <el-slider
            v-model="priceRangeto200"
            range
            :step="0.5"
            :max="190"
            :format-tooltip="formatPriceto200"
            :marks="markto200"
            show-input
          />
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" plain @click="resetpriceRange"> 초기화 </el-button>
          </span>
        </template>
      </el-dialog>

      <div>
        <el-table v-loading="loading" stripe :data="tableData" height="450" style="width: 100%">
          <el-table-column prop="formattedPrice" label="매매가" width="150" />
          <el-table-column :prop="grossArea" label="공급면적" width="130" />
          <el-table-column :prop="exclusiveArea" label="전용면적" width="130" />
          <el-table-column prop="floor" label="층" width="80" />
          <el-table-column prop="story" label="전체층" width="80" />
          <el-table-column prop="warrant" label="기보증금(만원)" width="180" />
          <el-table-column prop="rent" label="월세(만원)" width="180" />
          <el-table-column prop="earning" label="수익률(%)" width="180" />
          <el-table-column prop="articleNo" label="링크" />
        </el-table>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, reactive } from "vue";
import { division, region, sort } from "@/dropDown.js";
import { axiosGet, axiosPost } from "../tools/axios";

const _city = "인천시";
const _division = ref(0);
const _region = ref(0);
const _sort = ref(0);
const value = ref(true);
const loading = ref(false);
const filterPriceVisible = ref(false);
const grossArea = ref("grossArea"); //평 <-> m^2
const exclusiveArea = ref("exclusiveArea"); //평 <-> m^2
let priceRangeto10 = ref([0, 10]);
let priceRangeto200 = ref([0, 200]);
let tableData = reactive([]);
const markto10 = reactive({
  0: "0억",
  2.5: "2.5억",
  5: "5억",
  7.5: "7.5억",
  10: "10억",
});
const markto200 = reactive({
  0: "10억",
  40: "50억",
  90: "100억",
  140: "150억",
  190: "200억~",
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

  const getDivision = division[_division.value];
  const getRegion = region[_division.value][_region.value];
  const sortby = sortby_name[Math.floor(_sort.value / 2)];
  const sortorder = sortorder_name[_sort.value % 2];

  loading.value = true;
  axiosGet(
    "/api/deal/list",
    { division: getDivision, region: getRegion, sortby: sortby, sortorder: sortorder },
    onFetchSuccess,
    onFetchFail
  );
}

function onFetchSuccess(resp) {
  loading.value = false;
  console.log("😊 Success", resp);
  tableData = resp;
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

function formatPriceto10(price) {
  return price + "억";
}

function formatPriceto200(price) {
  const newPrice = price + 10;
  if (newPrice === 200) {
    return "200억~";
  }
  return newPrice + "억";
}

function resetpriceRange() {
  priceRangeto10.value = [0, 10];
  priceRangeto200.value = [0, 200];
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
  margin-right: 5px;
  margin-bottom: 15px;
}
</style>
