import React from 'react';

import {Block} from '../../types/block';
import styles from './block.module.scss';
import prettyBytes from 'pretty-bytes';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function(block: Block) {
    return (
        <div className={styles.block}>
            <h2>Block #{block.height}</h2>
            <p><span>Hash</span>: <Link to={"/block/" + block.hash}>{block.hash}</Link></p>
            <p><span>Transactions</span>: {block.tx.length}</p>
            <p><span>Date   </span>: {dayjs(block.time! * 1000).format("YYYY-MM-DD HH:MM:ss")}</p>
            <p><span>Size</span>: {prettyBytes(block.size)}</p>
        </div>
    )
}