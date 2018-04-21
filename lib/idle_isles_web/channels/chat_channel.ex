defmodule IdleIslesWeb.ChatChannel do
  use Phoenix.Channel

  def join("chat", _, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", %{"body" => body}, socket) do
    timestamp = DateTime.utc_now |> DateTime.to_time() |> Time.to_iso8601()
    broadcast! socket, "new:msg", %{name: socket.assigns.user.name, body: body, timestamp: timestamp}

    {:noreply, socket}
  end
end
