import React, { useEffect, useState } from 'react';

import styles from './home.module.scss';
import Navbar from '../../components/Navbar';
import BlockView from '../../components/BlockView';
import Client from '../../httpClient';
import { Block } from '../../types/block';
import { Button } from 'antd';


export default function(props: any) {

    const FETCH_SIZE = 10;

    const [blocks, setBlocks] = useState<Array<Block>>(new Array<Block>());

    const [skip, setSkip] = useState<number>(0);

    useEffect(() => {
        Client.Blocks.recent(skip, FETCH_SIZE).then(b => {
            const newBlocks = blocks.concat(b);
            setBlocks(newBlocks);
        }).catch(err => {
            if(err) throw err;
        });
    }, [skip]);

    return (
        <>
            <Navbar/>
            <div className={`page ${styles.home}`}>
                <div className="details">
                    <h1>Recent blocks</h1>

                    {blocks?.map(b => <BlockView {...b}/>)}
                    <Button onClick={() => setSkip(skip => skip + FETCH_SIZE)}>Show more</Button>
                </div>
            </div>
        </>
    )
}