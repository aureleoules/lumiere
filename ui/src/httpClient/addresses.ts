import axios from 'axios';
import { Address } from '../types/address';

const route = "/address";

export default {
    get: (address: string) => new Promise<Address>((resolve, reject) => {
        axios.get(`${route}/${address}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
}