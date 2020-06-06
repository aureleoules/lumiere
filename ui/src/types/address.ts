import { Transaction, AddressTransaction } from "./transaction";

export type Address = {
    address: string
    received: number
    spent: number
    unspent: number
    transactions: Array<AddressTransaction>
}