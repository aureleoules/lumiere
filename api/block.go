package api

import (
	"net/http"
	"strconv"

	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/btcjson"
	"github.com/btcsuite/btcd/chaincfg/chainhash"
	"go.uber.org/zap"

	"github.com/gin-gonic/gin"
)

func handleBlockRoutes() {
	api.GET("/blocks", handleRecentBlocks)
	api.GET("/blocks/:hash", handleBlock)
}

func handleRecentBlocks(c *gin.Context) {
	height, err := rpc.Client.GetBlockCount()
	if err != nil {
		response(c, http.StatusInternalServerError, err, nil)
		return
	}

	skip, err := strconv.ParseInt(c.Query("skip"), 10, 64)
	if err != nil {
		response(c, http.StatusNotAcceptable, err, nil)
		return
	}

	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil {
		response(c, http.StatusNotAcceptable, err, nil)
		return
	}

	var hash *chainhash.Hash
	hash, err = rpc.Client.GetBlockHash(height - skip)
	if err != nil {
		response(c, http.StatusNotFound, err, nil)
		return
	}

	var blocks []*btcjson.GetBlockVerboseResult
	for i := 0; i < limit; i++ {

		block, err := rpc.Client.GetBlockVerbose(hash)
		if err != nil {
			response(c, http.StatusNotFound, err, nil)
			return
		}
		blocks = append(blocks, block)

		hash, err = chainhash.NewHashFromStr(block.PreviousHash)
		if err != nil {
			response(c, http.StatusNotAcceptable, err, nil)
			return
		}
	}

	response(c, http.StatusOK, err, blocks)
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
