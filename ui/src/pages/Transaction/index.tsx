import React, { useState, useEffect } from 'react';

import styles from './transaction.module.scss';
import { Transaction } from '../../types/transaction';
import Client from '../../httpClient';
import Navbar from '../../components/Navbar';

import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import TransactionView from '../../components/TransactionView';

export default function(props: any) {

    const [tx, setTx] = useState<Transaction | null>(null);

    useEffect(() => {
        const hash = props.match.params.hash;
        Client.Transactions.get(hash).then(tx => {
            setTx(tx);

        }).catch(err => {
            if(err) throw err;
        });
    }, [props.match.params.hash]);

    return (
        <>
            <Navbar/>
            <div className={styles.transaction}>
                 {tx && <div className={styles.details}>
                    <h1>Transaction</h1>
                    <div className={styles.table}>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Hash
                            </div>
                            <div className={styles.value}>
                                {tx?.hash}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Confirmations
                            </div>
                            <div className={styles.value}>
                                {tx?.confirmations}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Timestamp
                            </div>
                            <div className={styles.value}>
                                {dayjs(tx?.time! * 1000).format("YYYY-MM-DD HH:MM:ss")}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Size
                            </div>
                            <div className={styles.value}>
                                {prettyBytes(tx.size)}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Virtual size
                            </div>
                            <div className={styles.value}>
                                {prettyBytes(tx.vsize)}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Weight
                            </div>
                            <div className={styles.value}>
                                {tx.weight}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Block
                            </div>
                            <div className={styles.value}>
                                {tx.blockhash}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Version
                            </div>
                            <div className={styles.value}>
                                {tx.version}
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Total input
                            </div>
                            <div className={styles.value}>
                                {tx.total_input} BTC
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Total output
                            </div>
                            <div className={styles.value}>
                                {tx.total_output} BTC
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Total fees
                            </div>
                            <div className={styles.value}>
                                {tx.total_fees} BTC
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Fee per byte
                            </div>
                            <div className={styles.value}>
                                {tx.total_fees * 100000000 / tx.size} sat/B
                            </div>
                        </div>
                        <div className={styles.element}>
                            <div className={styles.key}>
                                Fee per weight unit
                            </div>
                            <div className={styles.value}>
                                {tx.total_fees * 100000000 / tx.weight} sat/WU
                            </div>
                        </div>
                    </div>
                    <TransactionView {...tx}/>
                </div>}
            </div>
        </>
    )
}