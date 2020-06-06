import axios from 'axios';
import { Block } from '../types/block';

const route = "/blocks";

export default {
    get: (hash: string) => new Promise<Block>((resolve, reject) => {
        axios.get(`${route}/${hash}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }), 
    recent: (skip: number, limit: number) => new Promise<Array<Block>>((resolve, reject) => {
        axios.get(`${route}`, {
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