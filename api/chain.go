package api

import (
	"net/http"

	"github.com/aureleoules/lumiere/rpc"
	"github.com/gin-gonic/gin"
)

func handleInfos(c *gin.Context) {
	info, err := rpc.Client.GetInfo()
	if err != nil {
		response(c, http.StatusInternalServerError, err, nil)
		return
	}

	response(c, http.StatusOK, nil, info)
}
