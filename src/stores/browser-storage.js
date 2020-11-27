
const setupStorage = () => {
  if (!state.countries.length) { actions.addCountry('ALL'); }
  else {

  }
}

/* Update local browser storage */
const updateStorage = () => {
  const storage = chrome.storage.sync;
  if (state.countries.length) {
    storage.set({ 'countries': state.countries }, () => {
      console.log(`${state.countries[state.countries.length - 1]} saved to the local storage`);
    });
  }
}

export default {
  setupStorage,
  updateStorage
}