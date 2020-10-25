<template>
  <Fragment>
    <div v-if="loading" class="text-center absolute" style="margin:9rem 10rem;">
      <div
        class="spinner-border"
        role="status"
        style="width:3rem; height:3rem;"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="relative fadein">
      <div class="d-flex justify-content-center py-2">
        <div class="text-center">
          <strong>Today is:</strong>
          <div style="font-size:110%;" id="date">
            {{ getDate() }}
          </div>
        </div>
      </div>
      <Country :values="values" />
      <CountriesModal />
    </div>
  </Fragment>
</template>

<script>
import moment from "moment";
import myApi from "./helpers/myApi.js";

import CountriesModal from "./CountriesModal.vue";
import Country from "./Country.vue";

export default {
  el: "MainPanel",
  name: "MainPanel",
  components: {
    CountriesModal,
    Country
  },
  data() {
    return {
      loading: true,
      values: [],
      tags: [
        "New Cases Today: ",
        "New Deaths Today: ",
        "All cases: ",
        "Recoveries Today: "
      ]
    };
  },
  created() {
    myApi.get().then(res => {
      const virusData = [
        res.data.todayCases,
        res.data.todayDeaths,
        res.data.cases,
        res.data.todayRecovered
      ];
      for (let data = 0; data < virusData.length; data++) {
        this.values.push({ title: this.tags[data], value: virusData[data] });
      }
    });
    setTimeout(() => this.displayData(), 500);
  },
  methods: {
    getDate() {
      return moment(new Date()).format("D MMM YYYY");
    },
    displayData() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.fadein {
  animation: fadeIn ease 0.5s;
  overflow-y: hidden;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
