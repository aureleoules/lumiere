package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// Production
	router.Use(static.Serve("/", static.LocalFile("./build", true)))

	api := router.Group("/api")
	api.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "xd",
		})
	})

	router.Run(":8000")
}
