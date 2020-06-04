import axios from 'axios';

import Search from './search';
import Blocks from './blocks';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT || "/api";

const Client = {
    Search,
    Blocks
};

export default Client;