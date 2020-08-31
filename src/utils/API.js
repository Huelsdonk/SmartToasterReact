import axios from 'axios';
const BASE_URL = 'https://localhost:6001';

const API = {
    getToasters: function () {
        return axios.get(`${BASE_URL}/api/toasters`, {headers: {'Content-Type': 'application/json'}}
        )},

    updateToaster: function (updateObj, dbId) {
        return axios.put(`${BASE_URL}/api/toasters/${dbId}`, updateObj);
    }
};
export default API;