import axios from 'axios';
import { Transaction } from '../types/transaction';

const route = "/tx";

export default {
    get: (hash: string) => new Promise<Transaction>((resolve, reject) => {
        axios.get(`${route}/${hash}`).then(response => {
            resolve(response.data.payload[0]);
        }).catch(err => {
            reject(err);
        });
    }),
    batch: (hashlist: Array<string>) => new Promise<Array<Transaction>>((resolve, reject) => {
        axios.get(`${route}/${hashlist.join(",")}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
}