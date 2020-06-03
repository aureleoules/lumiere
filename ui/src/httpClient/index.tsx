import axios from 'axios';

import Search from './search';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const Client = {
    Search,
};

export default Client;