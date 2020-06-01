package api

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var api *gin.RouterGroup

// Listen func
func Listen(port string) {
	router := gin.Default()
	// Production
	router.Use(static.Serve("/", static.LocalFile("build", true)))
	api = router.Group("/api")
	api.GET("/", func(c *gin.Context) {
		c.JSON(200, "o")
	})

	handleBlockRoutes()
	handleAddressesRoutes()
	handleTransactionRoutes()

	router.Run("0.0.0.0:" + port)
}
