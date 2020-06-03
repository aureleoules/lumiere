import axios from 'axios';
import { SearchResult } from '../types/search_result';

const route = "/search";

export default {
    search: (value: string) => new Promise<SearchResult>((resolve, reject) => {
        axios.get(`${route}/${value}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }), 
}