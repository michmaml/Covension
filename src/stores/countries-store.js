import axios from "axios";

/**
 *  If the extension is opened for the very first time it will set world as 
 *  a default country card. All new countries will be saved to local
 *  @param state.countries and then passed to @function updateStorage() to 
 *  update local storage. Same goes for removing elements, first update the local 
 *  storage and then browser's storage.
 * 
 * 
 */


const STORAGE = chrome.storage.sync;
const API_URL = "https://disease.sh/v3/covid-19/";
const state = {
  /** Each country (max 3) : 
   * [
   *   {'New Cases Today: ' : @param casesToday},
   *   {'New Deaths Today: ' : @param deathsToday},
   *   {'All cases: ' : @param casesAll},
   *   {'Recoveries Today: ' : @param recoveriesToday},
   *   @param ISO_CODE,
   *   @param ICON_URL
   * ]
   */

  tags: [
    "New Cases Today: ",
    "New Deaths Today: ",
    "All cases: ",
    "Recoveries Today: "
  ],
  countriesISOs: [],
  countries: []
};

const actions = {
  addCountry(isoID) {
    const endpoint = isoID !== "ALL" ? `countries/${isoID}` : "all";
    axios.get(`${API_URL}${endpoint}`).then(res => {
      const countryData = [
        res.data.todayCases,
        res.data.todayDeaths,
        res.data.cases,
        res.data.todayRecovered
      ];
      const fullData = [];
      countryData.forEach((element, idx) => {
        fullData.push({ title: state.tags[idx], value: element });
      });
      if (isoID !== "ALL") {
        fullData.push(res.data.country);
        state.countriesISOs.push(isoID);
        fullData.push(`https://flagcdn.com/w320/${isoID.toLowerCase()}.png`);
      } else {
        fullData.push("World");
        fullData.push("../assets/planet-earth.png");
      }
      state.countries.push(fullData);
      updateStorage();
    });
  },
  removeCountry(isoID) {
    const { countries } = state;
    countries.splice(countries.findIndex(country => {
      return country[4] === isoID;
    }), 1);

    updateStorage();
  }
};

/**
 *  Handle CHROMIUM Local Storage
 * 
 */

(function setupStorage() {
  if (!state.countries.length) { actions.addCountry('ALL'); }
  else {
    STORAGE.get(null, (countries) => {
      //state.countries = 
      let t = Object.keys(countries);
      console.log(t);
    });
  }
})()

/* Update local browser storage */
const updateStorage = () => {
  if (state.countries.length) {
    STORAGE.set({ 'countries': state.countries });
  }
}

export default {
  state,
  actions
};
