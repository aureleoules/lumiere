package api

import (
	"net/http"

	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcutil"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func handleAddressesRoutes() {
	api.GET("/address/:address", handleAddress)
}

func handleAddress(c *gin.Context) {
	addressStr := c.Param("address")

	address, err := btcutil.DecodeAddress(addressStr, &chaincfg.TestNet3Params)
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
