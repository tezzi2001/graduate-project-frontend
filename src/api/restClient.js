import axios from 'axios'

const config = {
    baseURL: 'http://localhost:8080'
};

export default axios.create(config);