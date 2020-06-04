import axios from 'axios';
import { Block } from '../types/block';

const route = "/block";

export default {
    get: (hash: string) => new Promise<Block>((resolve, reject) => {
        axios.get(`${route}/${hash}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }), 
}