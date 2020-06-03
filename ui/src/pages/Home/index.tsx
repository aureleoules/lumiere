import React from 'react';

import styles from './home.module.scss';
import Navbar from '../../components/Navbar';

export default function(props: any) {
    return (
        <>
            <Navbar/>
            <div className={styles.home}>
                Home
            </div>
        </>
    )
}