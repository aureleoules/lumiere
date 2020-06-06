import React from 'react';
import styles from './tx.module.scss';
import {Transaction} from '../../types/transaction';
import { Link } from 'react-router-dom';

import {ReactComponent as Arrow} from '../../assets/svg/arrow.svg';
import { Button } from 'antd';

import TransactionActor from '../../components/TransactionActor';

export default function(tx: Transaction) {

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
                    {tx.vin && tx.vin.map((vin, i) => (
                        <TransactionActor link address={vin.address} amount={vin.value}/>
                    ))}
                    {!tx.vin && <TransactionActor address={"Coinbase"} />}
                </div>

                <Arrow/>

                <div className={styles.outputs}>
                    {tx.vout.map((vout, i) => {
                        if(vout.scriptPubKey.addresses) return <TransactionActor 
                            link
                            address={vout.scriptPubKey.addresses![0]} 
                            amount={vout.value}
                        />
                        return <TransactionActor 
                            address={"OP_RETURN"} 
                            amount={vout.value}
                        />}
                    )}
                </div>
            </div>
        </div>
    )
}
