import axios from 'axios'

const config = {
    baseURL: 'http://localhost:5000'
};

export default axios.create(config);