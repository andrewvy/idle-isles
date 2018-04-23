defmodule IdleIsles.Subzone.Registry do
  @moduledoc """
  Registry for looking up Subzone processes.
  """

  def child_spec(_opts) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, []},
      type: :worker,
      restart: :permanent,
      shutdown: 500,
    }
  end

  def start_link() do
    Registry.start_link(keys: :unique, name: __MODULE__)
  end
end
