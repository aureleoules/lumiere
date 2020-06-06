package api

import (
	"fmt"
	"net/http"

	"github.com/aureleoules/lumiere/models"
	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/chaincfg/chainhash"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func handleTransactionRoutes() {
	api.GET("/tx/:hash", handleTransaction)
}

func handleTransaction(c *gin.Context) {
	hash, err := chainhash.NewHashFromStr(c.Param("hash"))
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusBadRequest, err, nil)
		return
	}

	result, err := rpc.Client.GetRawTransactionVerbose(hash)
	if err != nil {
		response(c, http.StatusNotFound, err, nil)
		return
	}

	var inputs []models.TxVin
	var totalInput float64
	for _, vin := range result.Vin {
		h, err := chainhash.NewHashFromStr(vin.Txid)
		if err != nil {
			zap.S().Error("invalid utxo")
			response(c, http.StatusInternalServerError, err, nil)
		}
		utxo, err := rpc.Client.GetRawTransactionVerbose(h)
		if err != nil {
			zap.S().Error("invalid utxo")
			response(c, http.StatusInternalServerError, err, nil)
		}

		vout := utxo.Vout[vin.Vout]
		inputs = append(inputs, models.TxVin{
			Data:    vin,
			Address: vout.ScriptPubKey.Addresses[0],
			Value:   vout.Value,
		})

		totalInput += utxo.Vout[vin.Vout].Value
	}

	var totalOutput float64
	for _, vout := range result.Vout {
		totalOutput += vout.Value
	}

	fmt.Println(inputs)

	tx := models.Transaction{
		TotalFees:     totalInput - totalOutput,
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
	}

	response(c, http.StatusOK, nil, tx)
}
