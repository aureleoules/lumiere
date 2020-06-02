package main

import (
	"log"

	"github.com/aureleoules/lumiere/api"
	"github.com/aureleoules/lumiere/rpc"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func init() {
	// Add file line numbers to logs
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	// Initialize ZAP globally
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, _ := config.Build()
	zap.ReplaceGlobals(logger)
}

func main() {
	err := rpc.Init()
	if err != nil {
		zap.S().Panic(err)
		return
	}

	api.Listen("8000")
}
