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

const maxRetry = 5

// Init RPC client
func Init() error {
	tries++
	certs, err := ioutil.ReadFile(filepath.Join(os.Getenv("CERTS_LOCATION"), "rpc.cert"))
	if err != nil {
		return err
	}

	connCfg := &rpcclient.ConnConfig{
		Host:         os.Getenv("RPC_HOST"),
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
