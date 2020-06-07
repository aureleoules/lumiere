import React, { useEffect, useState } from 'react';

import Loader from 'react-loader-spinner';
import styles from './home.module.scss';
import Navbar from '../../components/Navbar';
import BlockView from '../../components/BlockView';
import Client from '../../httpClient';
import { Block } from '../../types/block';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';

export default function(props: any) {

    const FETCH_SIZE = 5;

    const [blocks, setBlocks] = useState<Array<Block>>(new Array<Block>());
    const [fetching, setFetching] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);

    useEffect(() => {
        setFetching(true);
        Client.Blocks.recent(skip, FETCH_SIZE).then(b => {
            const newBlocks = blocks.concat(b);
            setBlocks(newBlocks);
            setFetching(false);
        }).catch(err => {
            if(err) {
                setFetching(false);
                throw err;
            }
        });
    }, [skip]);

    const onScrollEnd = () => setSkip(skip => skip + FETCH_SIZE);
    useBottomScrollListener(onScrollEnd);

    return (
        <>
            {blocks.length > 0 && <div className={`page ${styles.home}`}>
                <div className="details">
                    <h1>Recent blocks</h1>
                    {blocks?.map((b, i) => <BlockView key={i} {...b}/>)}
                </div>
            </div>}
            {fetching && <div className="loader-container small">
                <Loader
                    type="ThreeDots"
                    color="#1a1919"
                    height={100}
                    width={100}
                />
            </div>}
        </>
    )
}