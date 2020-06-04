import {Transaction} from './transaction';

export type Block = {
    bits: string
    confirmations: number
    difficulty: number
    hash: string
    height: number
    merkleroot: string
    nextblockhash: string
    nonce: number
    previousblockhash: string
    size: number
    strippedsize: number
    time: 1296701466
    tx: Array<Transaction>
    version: number
    versionHex: string
    weight: number
}