package api

import (
	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var api *gin.RouterGroup

// Listen func
func Listen(port string) {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"PUT", "PATCH", "OPTIONS", "POST", "GET", "DELETE"},
		AllowedHeaders: []string{"Origin", "Content-Length", "Content-Type"},
	}))

	// Production
	router.Use(static.Serve("/", static.LocalFile("build", true)))
	api = router.Group("/api")
	api.GET("/", func(c *gin.Context) {
		c.JSON(200, "o")
	})

	handleSearchRoutes()
	handleBlockRoutes()
	handleAddressesRoutes()
	handleTransactionRoutes()

	router.Run("0.0.0.0:" + port)
}
