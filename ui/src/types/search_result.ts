export enum SearchResultType {
    Transaction,
    Block,
    Address
}

export type SearchResult = {
    type: SearchResultType
    data: string
}