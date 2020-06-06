# lumière
Simple Bitcoin block explorer

## Install
Here is the process to install lumière.

### Already have a BTCD node?

If you already have a btcd node running, make sure it has the `--txindex` and `--addrindex` parameters.  

Create a `.env` file from the `.env.sample` template. Checkout [Environment Variables](#environment-variables) for more informations.

Make sure to create a volume containing TLS certificates to connect to your node.

```bash
$ docker volume create btcd_certs
```

Now run the app.

```bash
$ docker-compose up
```

Check out [localhost:8000]().

### Need a new BTCD node?

Create a `.env` file from the `.env.sample` template.  
Leave the HOST variable as `btcd`.

Checkout [Environment Variables](#environment-variables) for more informations.

Make sure to create a volume containing the chain data and a volume containing TLS certificates.

```bash
$ docker volume create btcd_data
$ docker volume create btcd_certs
```

Now run the app.

```
$ docker-compose -f docker-compose.btcd.yml up
```

Check out [localhost:8000]().

## Development

Copy `.env.sample` to `.env`.

```bash
$ cp .env.sample .env
```

Make sure to create a volume containing the chain data and a volume containing TLS certificates.

```bash
$ docker volume create btcd_data
$ docker volume create btcd_certs
```

Now run the development environment.

```bash
$ docker-compose -f docker-compose.dev.yml up
```

This will start a BTCD node on the test network, the Go API and the UI.

The API is available at [localhost:8000/api]().  
The UI is available at [localhost:3000]().  

## Environment variables
* RPC_USER          # RPC username
* RPC_PASS          # RPC password
* RPC_HOST          # RPC host or ip
* RPC_PORT          # RPC port (optional)
* TESTNET           # Use testnet (TESTNET=1)
* CERTS_LOCATION    # Location of TLS certificates (optional) 