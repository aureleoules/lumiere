import React, { useEffect, useState } from 'react';

import styles from './address.module.scss';
import Navbar from '../../components/Navbar';

import {Address} from '../../types/address';
import Client from '../../httpClient';
import TransactionView from '../../components/TransactionView';
import Loader from 'react-loader-spinner';
import { Button } from 'antd';
import { AddressTransaction } from '../../types/transaction';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

export default function(props: any) {

    const PAGE_SIZE = 5;

    const [loadingTxs, setLoadingTxs] = useState<boolean>(false);
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

    const [address, setAddress] = useState<Address | null>(null);
    const [skip, setSkip] = useState<number>(0);
    const [txs, setTxs] = useState<Array<AddressTransaction>>(new Array<AddressTransaction>());

    useEffect(() => {
        setLoadingAddress(true);
        const address = props.match.params.address;
        Client.Addresses.get(address).then(addr => {
            setAddress(addr);
            setLoadingAddress(false);
        }).catch(err => {
            if(err) {
                setLoadingAddress(false);
                throw err;
            }
        });
    }, [props.match.params.address]);

    useEffect(() => {
        setLoadingTxs(true);
        const address = props.match.params.address;
        Client.Addresses.getTransactions(address, skip, PAGE_SIZE).then(data => {
            const newTxs = txs.concat(data);
            setTxs(newTxs);
            setLoadingTxs(false);
        }).catch(err => {
            if(err) {
                setLoadingTxs(false);
                throw err;
            }
        })
    }, [skip, props.match.params.address]);
    
    const onScrollEnd = () => setSkip(skip => skip+PAGE_SIZE);
    useBottomScrollListener(onScrollEnd);

    return (
        <>
            <Navbar/>
            {address && <div className={`page ${styles.address}`}>
                 <div className="details">
                    <h1>Address</h1>
                    <div className="table">                   
                        <div className="element">
                            <div className="key">
                                Address
                            </div>
                            <div className="value">
                                {address.address}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Unspent
                            </div>
                            <div className="value">
                                {address.unspent} BTC
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Total received
                            </div>
                            <div className="value">
                                {address.received} BTC
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Total spent
                            </div>
                            <div className="value">
                                {address.spent} BTC
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Transactions
                            </div>
                            <div className="value">
                                {address.transactions}
                            </div>
                        </div>
                    </div>

                    <h1>Transactions ({address.transactions})</h1>
                    {txs && <div>
                        {txs.map((tx, i) => (
                            <TransactionView coinbase={tx.vin[0].coinbase !== undefined} highlight={address.address} address key={i} vin={tx.vin} hash={tx.txid} vout={tx.vout}/>
                        ))}
                    </div>}
                    {loadingTxs && <div className="loader-container">
                        <Loader
                            type="ThreeDots"
                            color="#1a1919"
                            height={100}
                            width={100}
                        />
                    </div>}
                </div>
            </div>}

            {!address && <div className="loader-container">
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