use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :room_reservation_server, RoomReservationServerWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :room_reservation_server, RoomReservationServer.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "xycloud",
  password: "postgres",
  database: "room_reservation_server_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
