import React from 'react';
import styles from './tx.module.scss';
import {Transaction, AddressTransaction, Vin, VinWithPrevOut, Vout} from '../../types/transaction';
import { Link } from 'react-router-dom';

import {ReactComponent as Arrow} from '../../assets/svg/arrow.svg';
import { Button } from 'antd';

import TransactionActor from '../../components/TransactionActor';

type Props = {
    vin: Array<Vin | VinWithPrevOut>
    vout: Array<Vout>
    hash: string
    address?: boolean
    highlight?: string
    coinbase?: boolean
}

export default function(tx: Props) {

    function showDetails() {

    }

    return (
        <div className={styles.tx}>
            <div className={styles.top}>
                <Link to={"/tx/" + tx.hash}>{tx.hash}</Link>
                <Button onClick={showDetails}>Details</Button>
            </div>

            <div className={styles.details}>
                <div className={styles.inputs}>
                    <h2>Inputs ({tx.vin ? tx.vin.length : 1})</h2>
                    {tx.vin && !tx.coinbase && tx.vin.map((vin: any, i: number) => {
                        if(tx.address) return <TransactionActor 
                            key={i} 
                            link 
                            highlight={tx.highlight === vin.prevOut.addresses[0]}
                            address={vin.prevOut.addresses[0]} 
                            amount={vin.prevOut.value}
                        />;
                        return <TransactionActor
                            key={i} 
                            highlight={tx.highlight === vin.address}
                            link 
                            address={vin.address} 
                            amount={vin.value}
                        />;
                    })}
                    {(!tx.vin || tx.coinbase) && <TransactionActor address={"Coinbase"} />}
                </div>

                <Arrow/>

                <div className={styles.outputs}>
                    <h2>Outputs ({tx.vout.length})</h2>
                    {tx.vout.map((vout, i) => {
                        if(vout.scriptPubKey.addresses) return <TransactionActor 
                            key={i}
                            link
                            highlight={tx.highlight === vout.scriptPubKey.addresses![0]}
                            address={vout.scriptPubKey.addresses![0]} 
                            amount={vout.value}
                        />
                        return <TransactionActor 
                            key={i}
                            address={"OP_RETURN"} 
                            amount={vout.value}
                        />}
                    )}
                </div>
            </div>
        </div>
    )
}
