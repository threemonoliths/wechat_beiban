# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :room_reservation_server,
  ecto_repos: [RoomReservationServer.Repo]

# Configures the endpoint
config :room_reservation_server, RoomReservationServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "S5bEsRjqPE+A1alQkVLIGQD+qmHUHQmp3iuS3Jt3i8hBno721r/ixqYy1EuzZuia",
  render_errors: [view: RoomReservationServerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: RoomReservationServer.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :room_reservation_server, RoomReservationServerWeb.Guardian,
  issuer: "room_reservation_server",
  secret_key: "DkN2Q2z3v8QW13QCEhiS1IJ+YuBHU6qFn/l+x5uxYNDazvwJZl6mft28ktkA3lGh",
  ttl: {180, :day}

# Store uploaded file in local storage
config :arc,
  storage: Arc.Storage.Local

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
