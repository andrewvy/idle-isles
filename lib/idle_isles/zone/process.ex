defmodule IdleIsles.Zone.Process do
  @moduledoc """
  Process responsible for maintaining order in a zone.
  """

  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, [])
  end

  def init(state) do
    {:ok, state}
  end
end
