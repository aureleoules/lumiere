package api

import (
	"net/http"
	"strconv"

	"github.com/aureleoules/lumiere/models"
	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcd/chaincfg/chainhash"
	"github.com/btcsuite/btcutil"
	"github.com/gin-gonic/gin"
)

func handleSearchRoutes() {
	api.GET("/search/:value", handleSearch)
}

func handleSearch(c *gin.Context) {
	value := c.Param("value")

	hash, err := chainhash.NewHashFromStr(value)
	if err == nil {
		// Check if it is a transaction
		_, err := rpc.Client.GetRawTransaction(hash)
		if err == nil {
			response(c, http.StatusOK, nil, models.SearchResult{
				Type: models.TransactionType,
				Data: value,
			})
			return
		}

		// Check if it is a block
		_, err = rpc.Client.GetBlock(hash)
		if err == nil {
			response(c, http.StatusOK, nil, models.SearchResult{
				Type: models.BlockType,
				Data: value,
			})
			return
		}
	}
	// Cannot be a block, nor a tx
	address, err := btcutil.DecodeAddress(value, &chaincfg.TestNet3Params)
	if err == nil {
		if addressExists(address) {
			response(c, http.StatusOK, nil, models.SearchResult{
				Type: models.AddressType,
				Data: value,
			})
			return
		}
	}

	blockHeight, err := strconv.ParseInt(value, 10, 64)
	if err == nil {
		hash, err := rpc.Client.GetBlockHash(blockHeight)
		if err == nil {
			response(c, http.StatusOK, nil, models.SearchResult{
				Type: models.BlockType,
				Data: hash.String(),
			})
			return
		}
	}

	response(c, http.StatusNotFound, nil, nil)
	return
}
