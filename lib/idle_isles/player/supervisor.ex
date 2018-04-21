defmodule IdleIsles.Player.Supervisor do
  use DynamicSupervisor

  def start_link() do
    DynamicSupervisor.start_link(__MODULE__, {}, name: __MODULE__)
  end

  def start_player(user) do
    spec = {IdleIsles.Player.Entity, user}
    DynamicSupervisor.start_child(__MODULE__, spec)
  end

  def init(_) do
    DynamicSupervisor.init(
      strategy: :one_for_one
    )
  end
end
