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
      <div class="container">
        <hr class="mt-0" />
        <div
          class="d-flex align-items-center justify-content-around px-3 base"
          id="top"
        >
          <img
            src="../assets/planet-earth.png"
            title="Cases in the world..."
            style="width: 5rem; height: 5rem;"
          />
          <div class="text-center my-2">
            <h3>World</h3>
            <div class="grid mb-1">
              <div v-for="val in values" :key="val" class="px-2">
                <p class="m-0">{{ val.title }}</p>
                <p class="m-0 mb-1">{{ val.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-3 text-center">
        <button
          class="btn btn-outline-dark add-l font-weight-bold px-3"
          type="button"
          @click="showModal"
        >
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
        <CountriesModal ref="modal" />
      </div>
    </div>
  </Fragment>
</template>

<script>
import moment from "moment";
import myApi from "./helpers/myApi.js";
import $ from "jquery";

import CountriesModal from "./CountriesModal.vue";

//import Country from "@/components/Country.vue";

export default {
  el: "MainPanel",
  name: "MainPanel",
  components: {
    CountriesModal
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
    getDate: function() {
      return moment(new Date()).format("D MMM YYYY");
    },
    displayData: function() {
      this.loading = false;
    },
    showModal: function() {
      let element = this.$refs.modal.$el;
      $(element).modal("show");
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
