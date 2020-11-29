<template>
  <div style="width: 470px; overflow-y: hidden">
    <div v-if="loading" class="text-center absolute" style="margin: 9rem 10rem">
      <div
        class="spinner-border"
        role="status"
        style="width: 3rem; height: 3rem"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="relative fadein">
      <div class="d-flex justify-content-center py-2">
        <div class="text-center">
          <strong>Today is:</strong>
          <div style="font-size: 110%" id="date">
            {{ getDate() }}
          </div>
        </div>
      </div>
      <div v-for="country in countries" :key="country.code">
        <Country :country="country" />
      </div>
      <CountriesModal />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "../stores/countries-store";

import CountriesModal from "./CountriesModal.vue";
import Country from "./Country.vue";

export default {
  name: "MainPanel",
  components: {
    CountriesModal,
    Country,
  },
  data() {
    return {
      loading: true,
      storageSetup: store.storage.setupStorage,
      countries: store.state.countries,
    };
  },
  created() {
    this.storageSetup();
    setTimeout(() => this.displayData(), 500);
  },
  methods: {
    getDate() {
      return moment(new Date()).format("D MMM YYYY");
    },
    displayData() {
      this.loading = false;
    },
  },
};
</script>

<style>
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
