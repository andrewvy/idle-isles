defmodule IdleIslesWeb.UserChannel do
  use Phoenix.Channel

  def join("user:" <> id, _params, socket) do
    if to_string(socket.assigns.user.id) == id do
      user_pid = IdleIsles.Player.Registry.start_or_find_user(socket.assigns.user)
      {:ok, assign(socket, :user_pid, user_pid)}
    else
      {:error, %{reason: "Unauthorized"}}
    end
  end
end
