import React, { useEffect, useState } from 'react';

import styles from './address.module.scss';
import Navbar from '../../components/Navbar';

import {Address} from '../../types/address';
import Client from '../../httpClient';
import TransactionView from '../../components/TransactionView';
import Loader from 'react-loader-spinner';
import { Button } from 'antd';

export default function(props: any) {

    const PAGE_SIZE = 10;

    const [address, setAddress] = useState<Address | null>(null);
    const [limit, setLimit] = useState<number>(10);

    useEffect(() => {
        const address = props.match.params.address;
        Client.Addresses.get(address).then(addr => {
            setAddress(addr);
        }).catch(err => {
            if(err) throw err;
        });
    }, [props.match.params.address]);
    
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
                    </div>

                    <h1>Transactions ({address.transactions.length})</h1>
                    {address.transactions && <div>
                        {address.transactions!.slice(0, limit).map((tx, i) => (
                            <TransactionView coinbase={tx.vin[0].coinbase !== undefined} highlight={address.address} address key={i} vin={tx.vin} hash={tx.txid} vout={tx.vout}/>
                        ))}
                    </div>}
                    <Button onClick={() => setLimit(limit => limit+PAGE_SIZE)}>Show more</Button>
                </div>
            </div>}

            {!address && <div className="loader-container">
                <Loader
                    type="ThreeDots"
                    color="#1a1919"
                    height={100}
                    width={100}
                />
            </div>}}
        </>
    )
}