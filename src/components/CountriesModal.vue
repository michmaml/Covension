<template>
  <div>
    <div class="my-3 text-center">
      <button
        class="btn btn-outline-dark add-l font-weight-bold px-3 disable"
        :title="{ 'You cannot have more than 3 locations': countriesLimit }"
        :class="{ disable: countriesLimit }"
        data-toggle="modal"
        data-target=".modal"
        data-backdrop="static"
        data-keyboard="false"
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
              v-model="country"
              class="mx-4"
              placeholder="Type here..."
              label="name"
            >
              <template slot="option" slot-scope="option">
                <span class="mr-2" :class="option.code">
                  <img
                    class="border border-dark rounded"
                    :src="parseIcon(option.code)"
                    style="height:1.5rem; width:2.25rem;"
                  />
                </span>
                <span class="">{{ option.name }}</span>
                <hr class="mb-1 mt-2" />
              </template>
            </v-select>
            <div v-if="country" class="text-center">
              <div class="my-2">
                Do you want to add {{ country.name }} to the list?
              </div>
              <button
                @click="addCountry"
                class="btn btn-outline-dark"
                data-dismiss="modal"
              >
                Add country
              </button>
            </div>
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

import PlusIcon from "../assets/plus-icon.vue";

export default {
  name: "CountriesModal",
  components: {
    vSelect,
    PlusIcon
  },
  props: {
    countriesLimit: null
  },
  data() {
    return {
      countries: COUNTRIES,
      country: null
    };
  },
  methods: {
    parseIcon(code) {
      return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
    },
    addCountry() {
      this.$emit("addCountry", this.country.code);
    }
  }
};
</script>

<style scoped>
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

.disable {
  pointer-events: none;
}
</style>