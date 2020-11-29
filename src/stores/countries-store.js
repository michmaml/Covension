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
   *   @param Country_Name
   *   @param Country_ISO
   * ]
   */

  tags: [
    "New Cases Today: ",
    "New Deaths Today: ",
    "All cases: ",
    "Recoveries Today: "
  ],
  countries: []
};

const storage = {
  /* Setup the data everytime the extension is opened */
  setupStorage() {
    STORAGE.get(['countries'], function (data) {
      if (Object.keys(data).length === 0) {
        storage.addToStorage('ALL');
      } else {
        state.countries = [];
        for (const key in data) {
          storage.addToStorage(data[key]);
        }
      }
    });
  },

  /* Add to browser storage and change locally */
  addToStorage(isoCode) {
    STORAGE.get(['countries'], function (data) {
      if (Object.keys(data).length === 0) {
        STORAGE.set({ 'countries': [isoCode] });
      } else if (Object.keys(data).length <= 2) {
        data['countries'].push(isoCode);
        STORAGE.set({ 'countries': data['countries'] });
      }
      actions.addCountry(isoCode);
    });
  },

  /* Remove from browser storage and then locally */
  removeFromStorage(isoCode) {
    STORAGE.get(['countries'], function (data) {
      const updatedCountries = data.countries.filter(el => el !== isoCode);
      STORAGE.set({ 'countries': updatedCountries });
    });
    actions.removeCountry(isoCode);
  }
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
      fullData.push(isoID === 'ALL' ? 'World' : res.data.country);
      fullData.push(isoID);

      state.countries.push(fullData);
    });
  },
  removeCountry(isoID) {
    const { countries } = state;
    countries.splice(countries.findIndex(country => {
      return country[5] === isoID;
    }), 1);
  }
};

export default {
  state,
  storage
};
