<template>
  <!-- <div v-if="loading" class="d-flex justify-content-center" id="spinner">
      <div class="spinner-border" role="status"></div>
    </div> -->
  <div class="main-panel">
    <div class="d-flex justify-content-center py-2">
      <div class="date">
        <strong class="font-weight-bold">Today is:</strong>
        <div style="font-size:110%;" id="date">
          {{ getDate() }}
        </div>
      </div>
    </div>

    <div
      class="base d-flex flex-row align-items-center mx-2"
      style="margin-bottom: 1rem;"
      id="top"
    >
      <div class="pl-3">
        <img
          src="../assets/planet-earth.png"
          title="Cases in the world..."
          style="width: 5rem; height: 5rem;"
        />
      </div>
      <div class="content-text" style="flex-grow: 1;">
        <h3 style="margin: 0.5rem 0 0.25rem 0;">World</h3>
        <div class="content-data align-items-center">
          <div class="grid">
            <div v-for="val in values" :key="val">
              <p>{{ val.title }}</p>
              <p>{{ val.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-location pb-2">
      <button class="btn btn-outline-dark add-l font-weight-bold px-3">
        Add new location
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-plus-circle-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import myApi from "./api/myApi.js";

export default {
  el: "MainPanel",
  name: "MainPanel",
  data() {
    return {
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
  },
  methods: {
    getDate: function() {
      return moment(new Date()).format("D MMM YYYY");
    }
  }
};
</script>

<style scoped>
#top {
  background-color: rgb(240, 240, 240);
  border-bottom: 0.25rem solid rgb(28, 92, 35);
}

.base,
.add-l {
  border-radius: 1rem;
  border: 3px solid rgb(100, 100, 100);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
