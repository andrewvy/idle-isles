defmodule IdleIsles.Sync do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, [], [name: __MODULE__])
  end

  def init(state) do
    :timer.send_interval(2000, :tick)
    {:ok, state}
  end

  def subscribe_to(subscriber_pid) do
    GenServer.call(__MODULE__, {:subscribe, subscriber_pid})
  end

  def get_random_player() do
    GenServer.call(__MODULE__, :get_random_player)
  end

  def handle_call(:get_random_player, from, state) do
    {:reply, get_random_player_except_pid(state, from), state}
  end

  def handle_call({:subscribe, subscriber_pid}, _from, state) do
    {:reply, :ok, [subscriber_pid | state]}
  end

  def handle_info(:tick, state) do
    Enum.each(state, fn(pid) ->
      send(pid, :tick)
    end)

    {:noreply, state}
  end

  defp get_random_player_except_pid(state, exclude_pid) do
    if Enum.count(state) > 1 do
      get_random_player_except_pid(state, Enum.random(state), exclude_pid)
    else
      nil
    end
  end

  defp get_random_player_except_pid(state, random, exclude_pid) when random == exclude_pid do
    get_random_player_except_pid(state, Enum.random(state), exclude_pid)
  end

  defp get_random_player_except_pid(state, random, exclude_pid) do
    random
  end
end
