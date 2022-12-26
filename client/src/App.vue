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
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { division, region } from "@/localInfo.js";

const _city = "인천시";
const _division = ref(0);
const _region = ref(0);

function resetRegion() {
  _region.value = 0;
}
</script>
