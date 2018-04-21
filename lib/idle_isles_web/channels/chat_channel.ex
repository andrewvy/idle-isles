defmodule IdleIslesWeb.ChatChannel do
  use Phoenix.Channel

  def join("chat", _, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", %{"body" => body}, socket) do
    broadcast! socket, "new:msg", %{name: socket.assigns.user.name, body: body}

    {:noreply, socket}
  end
end
