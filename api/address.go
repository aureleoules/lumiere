package api

import (
	"fmt"
	"net/http"

	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/btcjson"
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcutil"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func handleAddressesRoutes() {
	api.GET("/address/:address", handleAddress)
}

// Address struct
type Address struct {
	Spent    float64 `json:"spent"`
	Received float64 `json:"received"`
	Unspent  float64 `json:"unspent"`

	Transactions []*btcjson.SearchRawTransactionsResult `json:"transactions"`
}

func handleAddress(c *gin.Context) {
	addressStr := c.Param("address")
	address, err := btcutil.DecodeAddress(addressStr, &chaincfg.TestNet3Params)
	if err != nil {
		fmt.Println("error", err)
		response(c, http.StatusNotFound, err, nil)
		return
	}

	txs, err := rpc.Client.SearchRawTransactionsVerbose(address, 0, 1000, true, false, nil)
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusNotFound, err, nil)
		return
	}

	var spent float64
	var received float64

	// Loop through transactions
	for _, tx := range txs {
		// Loop through inputs
		for _, in := range tx.Vin {
			// Check if address spent
			for _, addr := range in.PrevOut.Addresses {
				if addr == addressStr {
					spent += in.PrevOut.Value
				}
			}
		}

		// Loop through outputs
		for _, out := range tx.Vout {
			// Check if address received
			for _, addr := range out.ScriptPubKey.Addresses {
				if addr == addressStr {
					received += out.Value
				}
			}
		}
	}

	response(c, http.StatusOK, nil, Address{
		Received:     received,
		Spent:        spent,
		Unspent:      received - spent,
		Transactions: txs,
	})
}
