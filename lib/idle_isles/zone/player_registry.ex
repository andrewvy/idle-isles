defmodule IdleIsles.Zone.PlayerRegistry do
  @moduledoc """
  Registry for looking up player processes by Zone.
  """

  def start_link() do
    Registry.start_link(keys: :unique, name: __MODULE__)
  end
end
