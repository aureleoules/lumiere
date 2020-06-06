package models

import (
	"github.com/btcsuite/btcd/btcjson"
)

// TxVin struct wrapper
type TxVin struct {
	Data    btcjson.Vin `json:"data"`
	Address string      `json:"address"`
	Value   float64     `json:"value"`
}

// Transaction struct
type Transaction struct {
	TotalInput    float64        `json:"total_input"`
	TotalOutput   float64        `json:"total_output"`
	TotalFees     float64        `json:"total_fees"`
	Hex           string         `json:"hex"`
	Txid          string         `json:"txid"`
	Hash          string         `json:"hash"`
	Size          int32          `json:"size"`
	Vsize         int32          `json:"vsize"`
	Weight        int32          `json:"weight"`
	Version       int32          `json:"version"`
	LockTime      uint32         `json:"locktime"`
	Vin           []TxVin        `json:"vin"`
	Vout          []btcjson.Vout `json:"vout"`
	BlockHash     string         `json:"blockhash"`
	Confirmations uint64         `json:"confirmations"`
	Time          int64          `json:"time"`
	Blocktime     int64          `json:"blocktime"`
}
