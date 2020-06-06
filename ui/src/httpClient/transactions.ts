import axios from 'axios';
import { Transaction } from '../types/transaction';

const route = "/tx";

export default {
    get: (hash: string) => new Promise<Transaction>((resolve, reject) => {
        axios.get(`${route}/${hash}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }), 
}