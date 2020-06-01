package api

import "github.com/gin-gonic/gin"

// Response parser
func response(c *gin.Context, statusCode int, err error, payload interface{}) {
	var status string
	if statusCode >= 200 && statusCode <= 299 {
		status = "success"
	} else {
		status = "error"
	}
	data := gin.H{
		"code":    statusCode,
		"status":  status,
		"payload": payload,
	}
	if err != nil {
		data["error"] = err.Error()
	}

	c.JSON(statusCode, data)
}
