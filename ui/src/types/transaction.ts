export type Vin = {
    data: {
        scriptSig?: {
            asm: string
            hex: string
        }
        sequence: number
        txid?: string
        vout?: number
        coinbase?: string
    }
    address: string
    value: number
}

export type Vout = {
    n: number
    scriptPubKey: {
        asm: string
        hex: string
        type: string
        reqSigs?: number
        addresses?: Array<string>
    }
    value: number
}


export type Transaction = {
    total_input: number
    total_output: number
    total_fees: number
    blockhash: string
    blocktime: number
    confirmations: number
    hash: string
    hex: string
    locktime: number
    size: number
    time: number
    txid: string
    version: 1
    vin: Array<Vin>
    vout: Array<Vout>
    vsize: number
    weight: number
}

export type VinWithPrevOut = {
    prevOut: {
        addresses: Array<string>
        value: number
    }
    scriptSig: {
        asm: string 
        hex: string
    }
    sequence: number
    txid: string
    txinwitness: Array<string>
    vout: number
}

export type AddressTransaction = {
    total_input: number
    total_output: number
    total_fees: number
    blockhash: string
    blocktime: number
    confirmations: number
    hash: string
    hex: string
    locktime: number
    size: number
    time: number
    txid: string
    version: 1
    vin: Array<VinWithPrevOut>
    vout: Array<Vout>
    vsize: number
    weight: number
}