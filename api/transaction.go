package api

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/aureleoules/lumiere/models"
	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/chaincfg/chainhash"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func getTransaction(hash *chainhash.Hash) (models.Transaction, error) {
	result, err := rpc.Client.GetRawTransactionVerbose(hash)
	if err != nil {

		return models.Transaction{}, err
	}

	var inputs []models.TxVin
	var totalInput float64
	for _, vin := range result.Vin {
		if vin.Txid != "" {
			h, err := chainhash.NewHashFromStr(vin.Txid)
			if err != nil {
				zap.S().Error("uh oh", err)
				return models.Transaction{}, err
			}
			utxo, err := rpc.Client.GetRawTransactionVerbose(h)
			if err != nil {
				return models.Transaction{}, err
			}
			vout := utxo.Vout[vin.Vout]
			inputs = append(inputs, models.TxVin{
				Data:    vin,
				Address: vout.ScriptPubKey.Addresses[0],
				Value:   vout.Value,
			})

			totalInput += utxo.Vout[vin.Vout].Value
		}
	}

	var totalOutput float64
	for _, vout := range result.Vout {
		totalOutput += vout.Value
	}

	var fees float64 = 0
	if totalInput != 0 {
		fees = totalInput - totalOutput
	}

	return models.Transaction{
		TotalFees:     fees,
		TotalInput:    totalInput,
		TotalOutput:   totalOutput,
		Vin:           inputs,
		Vout:          result.Vout,
		BlockHash:     result.BlockHash,
		Blocktime:     result.Blocktime,
		Confirmations: result.Confirmations,
		Hash:          result.Hash,
		Hex:           result.Hex,
		LockTime:      result.LockTime,
		Size:          result.Size,
		Time:          result.Time,
		Txid:          result.Txid,
		Version:       result.Version,
		Vsize:         result.Vsize,
		Weight:        result.Weight,
	}, nil
}

func handleTransaction(c *gin.Context) {
	hashlist := strings.Split(c.Param("hash"), ",")

	var txs []models.Transaction

	for _, hash := range hashlist {
		h, err := chainhash.NewHashFromStr(hash)
		if err != nil {
			response(c, http.StatusNotAcceptable, err, nil)
			return
		}
		fmt.Println(h.String())

		tx, err := getTransaction(h)
		if err != nil {
			zap.S().Error(err)
			response(c, http.StatusNotFound, err, nil)
			return
		}

		txs = append(txs, tx)
	}

	response(c, http.StatusOK, nil, txs)
}
