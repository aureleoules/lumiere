package rpc

import (
	"errors"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"

	"github.com/btcsuite/btcd/rpcclient"
	"go.uber.org/zap"
)

// Client rpc
var Client *rpcclient.Client

var tries int

const maxRetry = 10

// Init RPC client
func Init() error {
	tries++
	location := os.Getenv("CERTS_LOCATION")
	if location == "" {
		location = "/certs"
	}

	certs, err := ioutil.ReadFile(filepath.Join(location, "rpc.cert"))
	if err != nil {
		return err
	}

	host := os.Getenv("RPC_HOST")

	if os.Getenv("RPC_PORT") != "" {
		host += ":" + os.Getenv("RPC_PORT")
	} else {
		if os.Getenv("NETWORK") == "testnet" {
			host += ":18334"
		} else {
			host += ":8334"
		}
	}

	connCfg := &rpcclient.ConnConfig{
		Host:         host,
		Endpoint:     "ws",
		User:         os.Getenv("RPC_USER"),
		Pass:         os.Getenv("RPC_PASS"),
		Certificates: certs,
	}

	Client, err = rpcclient.New(connCfg, nil)
	if err != nil {
		if tries >= maxRetry {
			return errors.New("couldn't connect to btcd")
		}
		zap.S().Info("Retrying RPC connection in 5 seconds... ", tries, " / ", maxRetry)
		time.Sleep(time.Second * 5)
		return Init()
	}

	hash, err := Client.GetBestBlockHash()
	if err != nil {
		return err
	}

	zap.S().Info(hash)

	return nil
}
