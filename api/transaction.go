package api

import (
	"net/http"

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

	tx, err := rpc.Client.GetRawTransactionVerbose(hash)
	if err != nil {
		response(c, http.StatusNotFound, err, nil)
		return
	}
	response(c, http.StatusOK, nil, tx)
}
