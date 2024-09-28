import axios from "axios";

axios.defaults.baseURL = 'https://habit-api-d1b10388b141.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true