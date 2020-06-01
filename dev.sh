#!/bin/bash

docker-compose -f docker-compose.dev.yml up -d
docker logs lumiere_core --follow --tail 1
