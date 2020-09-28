<template>
  <div>
    <!-- <div v-if="loading" class="d-flex justify-content-center" id="spinner">
      <div class="spinner-border" role="status"></div>
    </div> -->
    <div class="main-panel">
      <div class="py-2">
        <div class="font-weight-bold">Today is:</div>
        <div style="font-size:110%;" id="date">{{ getDate(event.target) }}</div>
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
              <!-- <div v-for="cases in rawData" class="">
              <strong>{{ cases.head }}</strong>
              <p class="value">{{ cases.value }}</p>
            </div> -->
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
  </div>
</template>

<script>
export default {
  name: "MainPanel",
  methods: {
    getDate: function(it) {
      return it;
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
