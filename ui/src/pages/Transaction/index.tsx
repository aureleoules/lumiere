import React, { useState, useEffect } from 'react';

import styles from './transaction.module.scss';
import { Transaction } from '../../types/transaction';
import Client from '../../httpClient';
import Navbar from '../../components/Navbar';
import Loader from 'react-loader-spinner';

import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import TransactionView from '../../components/TransactionView';
import { Link } from 'react-router-dom';

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
            {tx && <div className={`page ${styles.transaction}`}>
                 <div className="details">
                    <h1>Transaction</h1>
                    <div className="table">
                        <div className="element">
                            <div className="key">
                                Hash
                            </div>
                            <div className="value">
                                {tx?.txid}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Confirmations
                            </div>
                            <div className="value">
                                {tx?.confirmations}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Timestamp
                            </div>
                            <div className="value">
                                {dayjs(tx?.time! * 1000).format("YYYY-MM-DD HH:MM:ss")}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Size
                            </div>
                            <div className="value">
                                {prettyBytes(tx.size)}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Virtual size
                            </div>
                            <div className="value">
                                {prettyBytes(tx.vsize)}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Weight
                            </div>
                            <div className="value">
                                {tx.weight}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Block
                            </div>
                            <div className="value">
                                <Link to={"/block/" + tx.blockhash}>{tx.blockhash}</Link>
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Version
                            </div>
                            <div className="value">
                                {tx.version}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Total input
                            </div>
                            <div className="value">
                                {tx.total_input} BTC
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Total output
                            </div>
                            <div className="value">
                                {tx.total_output} BTC
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Total fees
                            </div>
                            <div className="value">
                                {tx.total_fees} BTC
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Fee per byte
                            </div>
                            <div className="value">
                                {tx.total_fees * 100000000 / tx.size} sat/B
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Fee per weight unit
                            </div>
                            <div className="value">
                                {tx.total_fees * 100000000 / tx.weight} sat/WU
                            </div>
                        </div>
                    </div>
                    <TransactionView hash={tx.txid} vin={tx.vin} vout={tx.vout}/>
                </div>
            </div>}
            {!tx && <div className="loader-container">
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