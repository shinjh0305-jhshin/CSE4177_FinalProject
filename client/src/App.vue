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
          <button type="button" class="btn btn-dark">검색</button>
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
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { division, region, sort } from "@/dropDown.js";

const _city = "인천시";
const _division = ref(0);
const _region = ref(0);
const _sort = ref(0);
const value = ref(true);

function resetRegion() {
  _region.value = 0;
}
</script>

<style scoped>
button {
  width: 80%;
}
</style>
