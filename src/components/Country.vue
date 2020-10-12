<template>
  <div class="container">
    <hr class="mt-0" />
    <div v-if="true" class="w-100 absolute" id="top">
      <ListCountries />
    </div>
    <div
      v-else
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
</template>

<script>
import ListCountries from "./ListCountries";

export default {
  name: "Country",
  components: {
    ListCountries
  },
  data() {
    return {
      true: true,
      result: null
    };
  }
};
</script>
