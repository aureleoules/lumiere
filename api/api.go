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
	api = router.Group("/api")
	router.Use(static.Serve("/", static.LocalFile("build", true)))
	router.NoRoute(func(c *gin.Context) {
		c.File("./build/index.html")
	})

	handleSearchRoutes()
	handleBlockRoutes()
	handleAddressesRoutes()
	handleTransactionRoutes()

	router.Run("0.0.0.0:" + port)
}
