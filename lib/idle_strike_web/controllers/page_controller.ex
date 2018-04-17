defmodule IdleStrikeWeb.PageController do
  use IdleStrikeWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
