package models

type SearchResultType string

const (
	BlockType       SearchResultType = "block"
	TransactionType                  = "tx"
	AddressType     SearchResultType = "address"
)

// SearchResult struct
type SearchResult struct {
	Type SearchResultType `json:"type"`
	Data string           `json:"data"`
}
