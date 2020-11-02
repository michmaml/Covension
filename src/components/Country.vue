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
          <div v-for="country in data" :key="country" class="px-2">
            <p class="m-0">{{ country.title }}</p>
            <p class="m-0 mb-1">{{ country.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Country",
  props: {
    data: null
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
  border-bottom: 0.25rem solid var(--green);
}

.base,
.add-l {
  border-radius: 1rem;
  border: 3px solid var(--grey);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>