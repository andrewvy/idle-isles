defmodule IdleIsles.Player.Registry do
  def start_link() do
    Registry.start_link(keys: :unique, name: __MODULE__)
  end

  def start_or_find_user(user) do
    case Registry.lookup(__MODULE__, user.id) do
      [] ->
        {:ok, pid} = IdleIsles.Player.Supervisor.start_player(user)
        pid
      [{pid, _}] ->
        pid
    end
  end
end
