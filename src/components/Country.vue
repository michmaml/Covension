<template>
  <div class="container">
    <hr class="mt-0" />
    <div
      class="d-flex align-items-center justify-content-around px-3 base"
      id="top"
    >
      <img
        :src="image.imgSrc"
        :title="image.imgTitle"
        :class="{ countryBorder: image.isCountry }"
        :style="{
          width: '5rem',
          height: image.imgHeight,
          border: image.imgBorder
        }"
      />
      <div class="text-center my-2">
        <div class="d-flex">
          <div style="flex:1;"></div>
          <h3>{{ image.imgName }}</h3>
          <div class="mt-1" style="flex:1;">
            <button type="button" class="close btn-close" aria-label="Close">
              <span aria-hidden="true" style="font-size:70%;">&#x274C;</span>
            </button>
          </div>
        </div>
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
    country: Array
  },
  data() {
    return {
      image:
        this.country[4] === "World"
          ? {
              imgSrc: imgWorld,
              imgTitle: "Cases in the world...",
              imgName: this.country[4],
              imgHeight: "5rem",
              imgBorder: "none",
              isCountry: false
            }
          : {
              imgSrc: this.country[5],
              imgTitle: `Flag of ${this.country[4]}`,
              imgName: this.country[4],
              imgHeight: "3.3rem",
              imgBorder: "",
              isCountry: true
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

.countryBorder {
  border: 2px solid;
  border-radius: 0.5rem;
}

.btn-close {
  padding: 0;
  margin: 0;
}
</style>
