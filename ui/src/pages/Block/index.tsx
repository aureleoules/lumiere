import React, { useEffect, useState } from 'react';

import styles from './block.module.scss';
import Client from '../../httpClient';
import Navbar from '../../components/Navbar';
import { Block } from '../../types/block';

import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';

export default function(props: any) {

    const [block, setBlock] = useState<Block | null>(null);

    useEffect(() => {
        const hash = props.match.params.hash;
        Client.Blocks.get(hash).then(b => {
            setBlock(b);
        }).catch(err => {
            if(err) throw err;
        });
    }, [props.match.params.hash]);

    return (
        <>
            <Navbar/>
            {block && <div className={styles.block}>
                <div className={styles.details}>
                    <h1>Block #{block?.height}</h1>
                    <div className={styles.elements}>                   
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Hash
                            </div>
                            <div className={styles.value}>
                                {block?.hash}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Confirmations
                            </div>
                            <div className={styles.value}>
                                {block?.confirmations}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Timestamp
                            </div>
                            <div className={styles.value}>
                                {dayjs(block?.time! * 1000).format("YYYY-MM-DD HH:MM:ss")}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Height
                            </div>
                            <div className={styles.value}>
                                {block?.height}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Number of transactions
                            </div>
                            <div className={styles.value}>
                                {block?.tx.length}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Difficulty
                            </div>
                            <div className={styles.value}>
                                {block?.difficulty}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Merkle root
                            </div>
                            <div className={styles.value}>
                                {block?.merkleroot}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Version
                            </div>
                            <div className={styles.value}>
                                {block?.version}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Bits
                            </div>
                            <div className={styles.value}>
                                {block?.bits}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Weight
                            </div>
                            <div className={styles.value}>
                                {block?.weight} WU
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Size
                            </div>
                            <div className={styles.value}>
                                {prettyBytes(block?.size!)}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Virtual size
                            </div>
                            <div className={styles.value}>
                                {prettyBytes(block?.strippedsize!)}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Nonce
                            </div>
                            <div className={styles.value}>
                                {block?.nonce}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Previous block
                            </div>
                            <div className={styles.value}>
                                {block?.previousblockhash}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}