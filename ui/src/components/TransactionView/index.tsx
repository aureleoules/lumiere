import React from 'react';
import styles from './tx.module.scss';
import {Transaction} from '../../types/transaction';
import { Link } from 'react-router-dom';

import {ReactComponent as Arrow} from '../../assets/svg/arrow.svg';
import { Button } from 'antd';

export default function(tx: Transaction) {
    return (
        <div className={styles.tx}>
            <div className={styles.top}>
                <Link to={"/tx/" + tx.hash}>{tx.hash}</Link>
                <Button >Details</Button>
            </div>

            <div className={styles.details}>
                <div className={styles.inputs}>
                    {tx.vin.map((vin, i) => (
                        <div className={styles.input}>
                            <Link to={"/address/" + vin.address} key={i}>{vin.address}</Link>
                            <span className={styles.amount}>{vin.value} BTC</span>
                        </div>
                    ))}
                </div>

                <Arrow/>

                <div className={styles.outputs}>
                    {tx.vout.map((vout, i) => (
                        <div className={styles.output}>
                            {vout.scriptPubKey.addresses && <Link to={"/address/" + vout.scriptPubKey.addresses![0]} key={i}>{vout.scriptPubKey.addresses![0]}</Link>}
                            {!vout.scriptPubKey.addresses && <span className={styles.op_return}>OP_RETURN</span>}
                            <span className={styles.amount}>{vout.value} BTC</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
