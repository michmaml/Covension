<template>
  <div>
    <div class="my-3 text-center">
      <button
        class="btn btn-outline-dark add-l font-weight-bold px-3"
        type="button"
        data-toggle="modal"
        data-target=".mod"
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
    </div>
    <div
      class="modal fade mod"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Choose a country from the list
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <v-select
              class="mx-4 px-4"
              label="name"
              :options="countries"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import COUNTRIES from "./helpers/countries.json";

export default {
  el: "CountriesModal",
  name: "CountriesModal",
  components: {
    vSelect
  },
  data() {
    return {
      countries: COUNTRIES
    };
  },
  computed: {
    displayList() {
      return this.input.length > 2;
    }
  }
};
</script>

<style>
.md {
  overflow-y: hidden;
}
.modal-content {
  margin-bottom: 12rem;
}
</style>
