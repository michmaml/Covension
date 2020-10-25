<template>
  <div>
    <div class="my-3 text-center">
      <button
        class="btn btn-outline-dark add-l font-weight-bold px-3"
        data-toggle="modal"
        data-target=".modal"
      >
        Add new location
        <plus-icon style="height:1em; width:1em;" />
      </button>
    </div>

    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog md" role="document">
        <div class="modal-content mod">
          <div class="modal-header">
            <h5>
              Choose a country from the list
            </h5>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <v-select
              :options="countries"
              class="mx-5"
              placeholder="Type here..."
              label="name"
            >
              <template class="mt-4" slot="option" slot-scope="option">
                <span class="mr-2" :class="option.code">
                  <img
                    class="border border-light rounded"
                    :src="parseIcon(option.code)"
                    style="height:1.5rem; width:2.25rem;"
                  />
                </span>
                {{ option.name }}
                <hr class="mb-1 mt-2" />
              </template>
            </v-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import COUNTRIES from "../assets/countries.json";

import PlusIcon from "./helpers/plus-icon.vue";

export default {
  el: "CountriesModal",
  name: "CountriesModal",
  components: {
    vSelect,
    PlusIcon
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
  },
  methods: {
    parseIcon(code) {
      return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
    }
  }
};
</script>

<style>
.md {
  overflow-y: hidden;
}
.modal-content {
  margin-bottom: 15rem;
}

.mod {
  border-radius: 0.8rem;
  border: 4px solid var(--green);
}

.list {
  text-align: center;
}
</style>