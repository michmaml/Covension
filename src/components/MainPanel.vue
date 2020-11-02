<template>
  <div style="width:470px;">
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
      <div v-for="country in countries" :key="country.code">
        <Country :data="country" />
      </div>
      <CountriesModal
        @addCountry="addCountry"
        :countriesLimit="countriesLimit"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

import CountriesModal from "./CountriesModal.vue";
import Country from "./Country.vue";

export default {
  name: "MainPanel",
  components: {
    CountriesModal,
    Country
  },
  data() {
    return {
      loading: true,
      countries: [],
      tags: [
        "New Cases Today: ",
        "New Deaths Today: ",
        "All cases: ",
        "Recoveries Today: "
      ],
      countriesLimit: false
    };
  },
  created() {
    this.addCountry("all");
    setTimeout(() => this.displayData(), 500);
  },
  computed: {
    allCountries() {
      return this.countries;
    }
  },
  methods: {
    addCountry(id) {
      if (this.countries.length < 4) {
        this.countriesLimit = false;

        if (id !== "all") id = "countries/" + id;
        axios.get(`https://disease.sh/v3/covid-19/${id}`).then(res => {
          const countryData = [
            res.data.todayCases,
            res.data.todayDeaths,
            res.data.cases,
            res.data.todayRecovered
          ];
          const fullData = [];
          countryData.forEach((element, idx) => {
            fullData.push({ title: this.tags[idx], value: element });
          });
          this.countries.push(fullData);
        });
      } else {
        this.countriesLimit = true;
      }
    },
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
