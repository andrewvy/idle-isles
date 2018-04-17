defmodule IdleIslesWeb.PageController do
  use IdleIslesWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
