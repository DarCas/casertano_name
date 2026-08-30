#!/bin/bash

#
# Dario Casertano <dario@casertano.name>
# Copyright (c) 2026 Casertano Dario – All rights reserved.
# Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
#

docker build -t ghcr.io/darcas/casertano_name-strapi:latest .
docker push ghcr.io/darcas/casertano_name-strapi:latest

docker image prune -f
docker builder prune -f
