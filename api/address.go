package api

import (
	"net/http"
	"os"

	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcutil"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func handleAddressesRoutes() {
	api.GET("/addresses/:address", handleAddress)
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
