import axios from "axios";

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
  countries: [],
  tags: [
    "New Cases Today: ",
    "New Deaths Today: ",
    "All cases: ",
    "Recoveries Today: "
  ],
  countriesISOs: []
};

const api = {
  API_URL: "https://disease.sh/v3/covid-19/",
  addCountry(isoID) {
    const endpoint = isoID !== "ALL" ? `countries/${isoID}` : "all";
    axios.get(`${this.API_URL}${endpoint}`).then(res => {
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
    });
  }
};

export default {
  state,
  api
};
