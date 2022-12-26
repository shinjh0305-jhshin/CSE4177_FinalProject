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
          <button type="button" class="btn btn-dark" @click="fetchData">검색</button>
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
      <div class="d-flex justify-content-start">
        <el-switch v-model="value" active-text="평" inactive-text="제곱미터" />
      </div>
      <div class="mt-3">
        <el-table v-loading="loading" stripe :data="tableData" height="450" style="width: 100%">
          <el-table-column prop="formattedPrice" label="매매가" width="150" />
          <el-table-column prop="grossArea" label="공급면적" width="130" />
          <el-table-column prop="exclusiveArea" label="전용면적" width="130" />
          <el-table-column prop="floor" label="층" width="80" />
          <el-table-column prop="story" label="전체층" width="80" />
          <el-table-column prop="warrant" label="기보증금(만원)" width="180" />
          <el-table-column prop="rent" label="월세(만원)" width="180" />
          <el-table-column prop="earning" label="수익률" width="180" />
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
let tableData = reactive([]);

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
</script>

<style scoped>
button {
  width: 80%;
}
</style>
