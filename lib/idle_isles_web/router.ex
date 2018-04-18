defmodule IdleIslesWeb.Router do
  use IdleIslesWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug IdleIslesWeb.Context
  end

  scope "/", IdleIslesWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  scope "/api" do
    pipe_through :api

    forward "/", Absinthe.Plug,
      schema: IdleIslesWeb.Schema
  end
end
