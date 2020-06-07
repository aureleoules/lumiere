import React, { useEffect, useState } from 'react';

import styles from './block.module.scss';
import Client from '../../httpClient';
import Navbar from '../../components/Navbar';
import { Block } from '../../types/block';
import Loader from 'react-loader-spinner';

import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import TransactionView from '../../components/TransactionView';
import { Transaction } from '../../types/transaction';
import { Link } from 'react-router-dom';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

export default function(props: any) {

    const PAGE_SIZE = 5;

    const [block, setBlock] = useState<Block | null>(null);
    const [txs, setTxs] = useState<Array<Transaction>>(new Array<Transaction>());
    const [skip, setSkip] = useState<number>(0);
    const [loadingTx, setLoadingTx] = useState<boolean>(false);
    const [loadingBlock, setLoadingBlock] = useState<boolean>(false);

    useEffect(() => {
        const hash = props.match.params.hash;
        setLoadingBlock(true);
        setSkip(0);
        setTxs(new Array<Transaction>());
        Client.Blocks.get(hash).then(b => {
            setBlock(b)
            setLoadingBlock(false);
        }).catch(err => {
            if(err) {
                setLoadingBlock(false);
                throw err;
            }
        });
    }, [props.match.params.hash]);

    useEffect(() => {
        if(block && skip < block.tx.length) fetchTransactions(skip);
    }, [block, skip]);
    
    function fetchTransactions(skip: number) {
        setLoadingTx(true);
        const list = block!.tx.slice(skip, skip + PAGE_SIZE);
        Client.Transactions.batch(list).then(data => {
            const newTxs = txs!.concat(data);
            setTxs(newTxs);
            setLoadingTx(false);
        }).catch(err => {
            if(err) {
                setLoadingTx(false);
                throw err;
            }
        });
    }

    const onScrollEnd = () => setSkip(skip => skip+PAGE_SIZE);
    useBottomScrollListener(onScrollEnd);

    return (
        <>
            <Navbar/>
            {block && <div className={`page ${styles.block}`}>
                <div className="details">
                    <h1>Block #{block?.height}</h1>
                    <div className="table">                   
                        <div className="element">
                            <div className="key">
                                Hash
                            </div>
                            <div className="value">
                                {block?.hash}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Confirmations
                            </div>
                            <div className="value">
                                {block?.confirmations}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Timestamp
                            </div>
                            <div className="value">
                                {dayjs(block?.time! * 1000).format("YYYY-MM-DD HH:MM:ss")}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Height
                            </div>
                            <div className="value">
                                {block?.height}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Number of transactions
                            </div>
                            <div className="value">
                                {block?.tx.length}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Difficulty
                            </div>
                            <div className="value">
                                {block?.difficulty}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Merkle root
                            </div>
                            <div className="value">
                                {block?.merkleroot}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Version
                            </div>
                            <div className="value">
                                {block?.version}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Bits
                            </div>
                            <div className="value">
                                {block?.bits}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Weight
                            </div>
                            <div className="value">
                                {block?.weight} WU
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Size
                            </div>
                            <div className="value">
                                {prettyBytes(block?.size!)}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Virtual size
                            </div>
                            <div className="value">
                                {prettyBytes(block?.strippedsize!)}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Nonce
                            </div>
                            <div className="value">
                                {block?.nonce}
                            </div>
                        </div>
                        <div className="element">
                            <div className="key">
                                Previous block
                            </div>
                            <div className="value">
                                <Link to={"/block/" + block?.previousblockhash}>{block?.previousblockhash}</Link>
                            </div>
                        </div>
                    </div>
                    <h1>Transactions ({block.tx.length})</h1>
                    {txs && <div>
                        {txs!.map((tx, i) => (
                            <TransactionView hash={tx.txid} vin={tx.vin} vout={tx.vout} key={i}/>
                        ))}
                    </div>}
                    {loadingTx && <div className="loader-container small">
                        <Loader
                            type="ThreeDots"
                            color="#1a1919"
                            height={100}
                            width={100}
                        />
                    </div>} 
                </div>
            </div>}
            {loadingBlock && <div className="loader-container">
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