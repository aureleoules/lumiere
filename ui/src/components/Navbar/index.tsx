import React, { useState, KeyboardEvent } from 'react';
import styles from './navbar.module.scss';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import httpClient from '../../httpClient';

import { SearchResult } from '../../types/search_result';

import history from '../../history';
import { Link } from 'react-router-dom';

export default function(props: any) {

    const [value, setValue] = useState<string>("");

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

    return (
        <div className={styles.navbar}>
                <Link className={styles.logo} to="/">
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
        </div>
    )
}