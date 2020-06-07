import axios from 'axios';
import { Infos } from '../types/infos';

const route = "/infos";

export default {
    get: () => new Promise<Infos>((resolve, reject) => {
        axios.get(`${route}`).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }), 
}