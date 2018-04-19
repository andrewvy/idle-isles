defmodule IdleIslesWeb.ChatChannel do
  use Phoenix.Channel

  def join("chat", _, socket) do
    :timer.send_interval(5000, :ping)
    {:ok, socket}
  end

  def handle_info(:ping, socket) do
    push socket, "new:msg", %{user: "SYSTEM", body: "ping"}
    {:noreply, socket}
  end
end
