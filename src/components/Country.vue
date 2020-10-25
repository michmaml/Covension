<template>
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
</template>

<script>
//import CountriesList from "./CountriesList";

export default {
  name: "Country",
  components: {},
  props: {
    values: null
  },
  data() {
    return {
      true: true,
      result: null
    };
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