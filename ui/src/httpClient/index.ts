import axios from 'axios';

import Search from './search';
import Blocks from './blocks';
import Transactions from './transactions';
import Addresses from './addresses';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT || "/api";

const Client = {
    Search,
    Blocks,
    Transactions,
    Addresses
};

export default Client;