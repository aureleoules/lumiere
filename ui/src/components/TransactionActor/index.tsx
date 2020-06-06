import React from 'react';

import styles from './tx_actor.module.scss';
import { Link } from 'react-router-dom';

type Props = {
    address: string
    amount?: number
    link?: boolean
}

export default function(props: Props) {
    return (
        <div className={styles.actor}>
            {!props.link && <span className={styles.address}>{props.address}</span>}
            {props.link && <Link className={styles.address} to={"/address/" + props.address}>{props.address}</Link>}

            {props.amount !== undefined && <span className={styles.amount}>{props.amount} BTC</span>}
        </div>
    )
}   