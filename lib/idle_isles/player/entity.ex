defmodule IdleIsles.Player.Entity do
  use GenServer

  @initial_state %{
    user: nil,
    health: 100,
  }

  def start_link(user) do
    GenServer.start_link(__MODULE__, user, [
      name: {:via, Registry, {IdleIsles.Player.Registry, user.id}}
    ])
  end

  def init(user) do
    :timer.send_interval(2000, :tick)
    {:ok, @initial_state |> Map.put(:user, user)}
  end

  def get_health(pid) do
    GenServer.call(pid, :get_health)
  end

  def handle_call(:get_health, _from, state) do
    {:reply, state.health, state}
  end

  def handle_info(:tick, state) do
    new_state = Map.update(state, :health, 100, fn(health) ->
      new_health = health - 5

      if new_health < 0 do
        0
      else
        new_health
      end
    end)

    dispatch(new_state)
    {:noreply, new_state}
  end

  defp dispatch(state) do
    topic = "user:#{state.user.id}"
    event = "tick"

    IdleIslesWeb.Endpoint.broadcast(topic, event, %{
      health: state.health
    })
  end
end
