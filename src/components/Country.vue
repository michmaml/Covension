<template>
  <div class="container">
    <hr class="mt-0" />
    <div
      class="d-flex align-items-center justify-content-around px-3 base"
      id="top"
    >
      <img
        :src="image.imgSrc"
        title="Cases in the world..."
        class="border border-dark rounded"
        :style="{
          width: '5rem',
          height: image.imgHeight,
          border: image.imgBorder
        }"
      />
      <div class="text-center my-2">
        <h3>{{ image.imgName }}</h3>
        <div class="grid mb-1">
          <div v-for="cases in country" :key="cases.title" class="px-2">
            <p class="m-0">{{ cases.title }}</p>
            <p class="m-0 mb-1">{{ cases.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgWorld from "../assets/planet-earth.png";

export default {
  name: "Country",
  props: {
    country: null
  },
  data() {
    return {
      image:
        this.country[4] === "World"
          ? {
              imgSrc: imgWorld,
              imgName: this.country[4],
              imgHeight: "5rem",
              imgBorder: "none"
            }
          : {
              imgSrc: this.country[5],
              imgName: this.country[4],
              imgHeight: "3.3rem",
              imgBorder: ""
            }
    };
  },
  methods: {}
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
