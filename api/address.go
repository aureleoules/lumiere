package api

import (
	"net/http"
	"os"
	"strconv"

	"github.com/aureleoules/lumiere/rpc"
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcutil"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func handleAddressesRoutes() {
	api.GET("/addresses/:address", handleAddress)
	api.GET("/addresses/:address/tx", handleAddressTransactions)
}

func handleAddress(c *gin.Context) {
	addressStr := c.Param("address")

	var networkParams chaincfg.Params = chaincfg.MainNetParams
	if os.Getenv("TESTNET") == "1" {
		networkParams = chaincfg.TestNet3Params
	}
	address, err := btcutil.DecodeAddress(addressStr, &networkParams)
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusNotAcceptable, err, nil)
		return
	}

	data, err := getAddressData(address)
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusNotFound, err, nil)
		return
	}

	data.Address = addressStr

	response(c, http.StatusOK, nil, data)
}

func handleAddressTransactions(c *gin.Context) {
	addressStr := c.Param("address")

	var networkParams chaincfg.Params = chaincfg.MainNetParams
	if os.Getenv("TESTNET") == "1" {
		networkParams = chaincfg.TestNet3Params
	}
	address, err := btcutil.DecodeAddress(addressStr, &networkParams)
	if err != nil {
		zap.S().Error(err)
		response(c, http.StatusNotAcceptable, err, nil)
		return
	}

	skip, err := strconv.Atoi(c.Query("skip"))
	if err != nil {
		response(c, http.StatusNotAcceptable, err, nil)
		return
	}

	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil {
		response(c, http.StatusNotAcceptable, err, nil)
		return
	}

	tx, err := rpc.Client.SearchRawTransactionsVerbose(address, skip, limit, true, false, nil)
	if err != nil {
		response(c, http.StatusNotFound, err, nil)
		return
	}

	response(c, http.StatusOK, nil, tx)
}
