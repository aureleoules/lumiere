import React, { useState, KeyboardEvent, useEffect } from 'react';
import styles from './navbar.module.scss';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import httpClient from '../../httpClient';

import { SearchResult } from '../../types/search_result';

import history from '../../history';
import { Link } from 'react-router-dom';
import { Infos } from '../../types/infos';

import BitcoinLogo from '../../assets/svg/bitcoin.svg';
import BitcoinTestnetLogo from '../../assets/svg/bitcoin_testnet.svg';

import {ReactComponent as GlobeIcon} from '../../assets/svg/globe.svg'; 

export default function(props: any) {

    const [value, setValue] = useState<string>("");
    const [infos, setInfos] = useState<Infos | null>(null);

    function submit(event: KeyboardEvent<HTMLInputElement>) {
        // Enter key
        if(event.keyCode !== 13) return;
        if(value === "") return;

        httpClient.Search.search(value).then((result: SearchResult) => {
            setValue("");
            history.push('/' + result.type + '/' + result.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    useEffect(() => {
        httpClient.Infos.get().then(infos => {
            setInfos(infos);
        }).catch(err => {
            if(err) throw err;
        });
    }, []);

    return (
        <div className={styles.navbar}>
            <Link className={styles.logo} to="/">
                <img src={infos?.testnet ? BitcoinTestnetLogo : BitcoinLogo}/>
                lumière
            </Link>

            <Input
                onChange={e => setValue(e.target.value)} 
                value={value}
                onKeyDown={submit}
                className={styles.search} 
                size="large" 
                placeholder="Lookup blocks, height, transactions, addresses" 
                prefix={<SearchOutlined />} 
            />

            <div className={styles.connections}>
                <GlobeIcon/>
                <span>{infos?.connections}</span>
            </div>
        </div>
    )
}