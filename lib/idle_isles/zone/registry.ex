defmodule IdleIsles.Zone.Registry do
  @moduledoc """
  Registry for looking up Zone processes.
  """

  def start_link() do
    Registry.start_link(keys: :unique, name: __MODULE__)
  end
end
