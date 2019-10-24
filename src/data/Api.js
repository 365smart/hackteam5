const get = (endpoint) => {
  return fetch('/capadm' + endpoint)
    .then(res => res.text())
    .then(text => JSON.parse(text));
}

const Api = {};

Api.locationList = () => get('/location/listjson');

export default Api;
