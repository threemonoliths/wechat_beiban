#/bin/bash

docker run --name room_reservation_server_dev \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=room_reservation_server_dev \
-p 5432:5432 \
-d postgres