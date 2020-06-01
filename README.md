# lumière
Simple Bitcoin block explorer

## Install

### BTCD

```
$ docker build -f Dockerfile.btcd -t btcd .
$ docker run -it \ 
    --name btc \
    -v $PWD/certs:/certs \
    -v $PWD/data:/root/.btcd \
    -e RPC_USER=user
    -e RPC_PASS=pass
    btcd
```

### Lumière


```bash
$ docker build -t lumiere .
$ docker run -itd --name lumiere -p 8000:8000 lumiere
```

or

```bash
$ docker-compose up -d
```

## Development

```bash
$ docker-compose -f docker-compose.dev.yml up
```

This will start a BTCD node on the test network, the Go api and the UI.

The API is available at [localhost:8000/api]().  
The UI is available at [localhost:3000]().  
