package api

import (
	"net/http"

	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/chaincfg/chainhash"
	"go.uber.org/zap"

	"github.com/gin-gonic/gin"
)

func handleBlockRoutes() {
	api.GET("/block/:hash", handleBlock)
}

func handleBlock(c *gin.Context) {
	hash, err := chainhash.NewHashFromStr(c.Param("hash"))
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusBadRequest, err, nil)
		return
	}

	block, err := rpc.Client.GetBlockVerbose(hash)
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusNotFound, err, nil)
		return
	}

	response(c, http.StatusOK, err, block)
}
