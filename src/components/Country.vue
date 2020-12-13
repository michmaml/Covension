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
          border: image.imgBorder,
        }"
      />
      <div class="text-center my-2">
        <div class="d-flex">
          <div style="flex: 1"></div>
          <h3>{{ image.imgName }}</h3>
          <div class="mt-1" style="flex: 1">
            <button
              v-if="
                countries.length > 1 &&
                countries.indexOf(country) === countries.length - 1
              "
              type="button"
              class="close"
              aria-label="Close"
              @click="removeCountry(country[5])"
            >
              <span aria-hidden="true" class="emoji e-trans">&#X274C;</span>
            </button>
          </div>
        </div>
        <div class="grid mb-1">
          <div v-for="cases in country" :key="cases.title" class="px-2">
            <p class="m-0">{{ parseNumber(cases.title) }}</p>
            <p class="m-0 mb-1">{{ parseNumber(cases.value) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgWorld from "../assets/planet-earth.png";
import store from "../stores/countries-store";

export default {
  name: "Country",
  props: {
    country: Array,
  },
  data() {
    return {
      removeCountry: store.storage.removeFromStorage,
      countries: store.state.countries,
      image:
        this.country[4] === "World"
          ? {
              imgSrc: imgWorld,
              imgTitle: "Cases in the world...",
              imgName: this.country[4],
              imgHeight: "5rem",
              imgBorder: "none",
              isCountry: false,
            }
          : {
              imgSrc: `https://flagcdn.com/w320/${this.country[5].toLowerCase()}.png`,
              imgTitle: `Flag of ${this.country[4]}`,
              imgName: this.country[4],
              imgHeight: "3.3rem",
              imgBorder: "",
              isCountry: true,
            },
    };
  },
  methods: {
    parseNumber(value) {
      let length = Math.ceil(Math.log10(value + 1));
      if (length > 4) {
        let numbers = value.toString().split("");
        let iter = 1;
        for (let i = numbers.length - 1; i > 0; i--) {
          if (iter % 3 === 0) numbers.splice(i, 0, ",");
          iter++;
        }
        value = numbers.join("");
      }
      return value;
      //return value.toLocaleString();
    },
  },
};
</script>

<style scoped>
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
  border: 3px solid;
  border-radius: 0.5rem;
}

/* Emoji transformations */
.emoji {
  font-size: 70%;
  transform: scale(0.5);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: text-shadow 0.2s ease-in-out, transform 0.3s ease-in-out;
}

.emoji:hover {
  transform: scale(1);
  text-shadow: 0 20px 20px rgba(0, 0, 0, 0.3);
}
</style>
