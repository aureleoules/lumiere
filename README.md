# lumière
Simple Bitcoin block explorer

## Install

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
$ docker-compose -f docker-compose.yml up
```
This will start the webpack process for the ui and the Go backend.
