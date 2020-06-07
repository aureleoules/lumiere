package api

import (
	"math"

	"github.com/aureleoules/lumiere/models"
	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcutil"
	"github.com/gin-gonic/gin"
)

// Response parser
func response(c *gin.Context, statusCode int, err error, payload interface{}) {
	var status string
	if statusCode >= 200 && statusCode <= 299 {
		status = "success"
	} else {
		status = "error"
	}
	data := gin.H{
		"code":    statusCode,
		"status":  status,
		"payload": payload,
	}
	if err != nil {
		data["error"] = err.Error()
	}

	c.JSON(statusCode, data)
}

func addressExists(address btcutil.Address) bool {
	_, err := rpc.Client.SearchRawTransactions(address, 0, 1, false, nil)
	return err == nil
}

func getAddressData(address btcutil.Address) (models.AddressData, error) {

	txs, err := rpc.Client.SearchRawTransactionsVerbose(address, 0, math.MaxInt16, true, false, nil)
	if err != nil {
		return models.AddressData{}, err
	}

	var spent float64
	var received float64

	// Loop through transactions
	for _, tx := range txs {
		// Loop through inputs
		for _, in := range tx.Vin {
			// Check if address spent
			if in.PrevOut != nil {
				for _, addr := range in.PrevOut.Addresses {
					if addr == address.String() {
						spent += in.PrevOut.Value
					}
				}
			}
		}

		// Loop through outputs
		for _, out := range tx.Vout {
			// Check if address received
			for _, addr := range out.ScriptPubKey.Addresses {
				if addr == address.String() {
					received += out.Value
				}
			}
		}
	}

	return models.AddressData{
		Received:     received,
		Spent:        spent,
		Unspent:      received - spent,
		Transactions: len(txs),
	}, nil
}
