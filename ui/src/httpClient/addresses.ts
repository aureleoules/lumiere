import axios from 'axios';
import { Address } from '../types/address';
import { AddressTransaction } from '../types/transaction';

const route = "/addresses";

export default {
    get: (address: string) => new Promise<Address>((resolve, reject) => {
        axios.get(`${route}/${address}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
    getTransactions: (address: string, skip: number, limit: number) => new Promise<Array<AddressTransaction>>((resolve, reject) => {
        axios.get(`${route}/${address}/tx`, {
            params: {
                skip,
                limit
            }
        }).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
}