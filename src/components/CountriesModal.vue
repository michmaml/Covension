<template>
  <div style="overflow-y: hidden">
    <div class="my-3 text-center">
      <button
        v-if="state.countries.length < 3"
        class="btn btn-outline-dark font-weight-bold px-3"
        data-toggle="modal"
        data-target=".modal"
        data-backdrop="static"
        data-keyboard="false"
        @click="resetCountry"
      >
        Add new location
        <plus-icon style="height: 1em; width: 1em" />
      </button>
      <div v-else class="text-muted font-italic">
        Only 3 locations are allowed at a time
      </div>
    </div>

    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog md" role="document">
        <div class="modal-content mod">
          <div class="modal-header">
            <h5>Choose a country from the list</h5>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <v-select
              :options="listOfCountries"
              v-model="country"
              class="mx-4"
              placeholder="Type 3 or more letters..."
              label="name"
            >
              <template slot="option" slot-scope="option">
                <div class="my-1">
                  <span class="mr-2" :class="option.code">
                    <img
                      class="border border-dark rounded"
                      :src="parseIcon(option.code)"
                      style="height: 1.5rem; width: 2.25rem"
                    />
                  </span>
                  <span>{{ option.name }}</span>
                </div>
                <hr class="m-0" />
              </template>
            </v-select>
            <div v-if="country" class="text-center">
              <div class="my-2">
                Do you want to add <strong>{{ country.name }}</strong> to the
                list?
              </div>
              <button
                @click="addCountry(this.country.code)"
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
import countriesStore from "../assets/countries-store";
import PlusIcon from "../assets/plus-icon.vue";

export default {
  name: "CountriesModal",
  components: {
    vSelect,
    PlusIcon,
  },
  data() {
    return {
      country: null,
      searchInput: "",
      countries: COUNTRIES,
      state: countriesStore.state,
      addCountry: countriesStore.actions.addCountry,
    };
  },
  /*   created() {
    this.countries = this.searchInput.length > 2 ? COUNTRIES : [];
  }, */
  computed: {
    listOfCountries() {
      return this.countries.filter((el) => {
        return !this.state.countriesISOs.includes(el.code);
      });
    },
  },
  methods: {
    parseIcon(code) {
      return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
    },
    resetCountry() {
      this.country = null;
    },
    /* validateInput(e) {
      const isCharacterValid = /[a-z]/g.test(e.key);
      if (isCharacterValid) this.searchInput = this.searchInput + e.key;
    }, */
  },
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
</style>