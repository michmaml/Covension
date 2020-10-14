<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <CountriesList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import COUNTRIES from "./helpers/countries.json";

export default {
  el: "CountriesModal",
  name: "CountriesModal",
  data() {
    return {
      countries: COUNTRIES
    };
  },
  computed: {
    displayList: function() {
      return this.input.length > 2;
    }
  }
};
</script>

<style>
.j {
  display: inline;
}
</style>
