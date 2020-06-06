package models

import "github.com/btcsuite/btcd/btcjson"

// AddressData struct
type AddressData struct {
	Address  string  `json:"address"`
	Spent    float64 `json:"spent"`
	Received float64 `json:"received"`
	Unspent  float64 `json:"unspent"`

	Transactions []*btcjson.SearchRawTransactionsResult `json:"transactions"`
}
