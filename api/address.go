package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func handleAddressesRoutes() {
	api.GET("/address/:address", handleAddress)
}

func handleAddress(c *gin.Context) {
	response(c, http.StatusOK, nil, nil)
}
