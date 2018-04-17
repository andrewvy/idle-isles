# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :idle_strike,
  ecto_repos: [IdleStrike.Repo]

# Configures the endpoint
config :idle_strike, IdleStrikeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "JxW/xo1bLk0GUXhpCEGAsdXXutq7YomPIPoRX/KufmQaVNaTtoi2Xsjw9o1c/CO/",
  render_errors: [view: IdleStrikeWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: IdleStrike.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
