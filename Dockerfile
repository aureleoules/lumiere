FROM node:latest as node

# Build ui
COPY ui /app
WORKDIR /app
RUN yarn && yarn build

# Build golang
FROM golang:latest as go

COPY . /app

WORKDIR /app
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s"

FROM scratch
COPY --from=go /app/lumiere /app/lumiere
COPY --from=node /app/build /app/build

WORKDIR /app
ENTRYPOINT ["./lumiere"]
