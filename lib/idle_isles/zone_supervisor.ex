defmodule IdleIsles.ZoneSupervisor do
  use Supervisor

  def start_link() do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  @impl true
  def init(_arg) do
    children = [
      IdleIsles.Zone.Registry,
      IdleIsles.Subzone.Registry,
      IdleIsles.Subzone.PlayerRegistry,
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
