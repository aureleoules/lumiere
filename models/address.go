package models

// AddressData struct
type AddressData struct {
	Address      string  `json:"address"`
	Spent        float64 `json:"spent"`
	Received     float64 `json:"received"`
	Unspent      float64 `json:"unspent"`
	Transactions int     `json:"transactions"`
}
