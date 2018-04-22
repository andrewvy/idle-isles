defmodule IdleIsles.Player.Entity do
  use GenServer

  @ticks_to_respawn 3
  @starting_health 100

  @initial_state %{
    user: nil,
    health: @starting_health,
    state: :alive,
    respawn_ticks: @ticks_to_respawn,
    damage_events: [],
  }

  def start_link(user) do
    GenServer.start_link(__MODULE__, user, [
      name: {:via, Registry, {IdleIsles.Player.Registry, user.id}}
    ])
  end

  def init(user) do
    IdleIsles.Sync.subscribe_to(self())
    {:ok, @initial_state |> Map.put(:user, user)}
  end

  def get_health(pid) do
    GenServer.call(pid, :get_health)
  end

  def damage(pid, source_user, damage, damage_type) do
    GenServer.cast(pid, {:damage, source_user, damage, damage_type})
  end

  def handle_call(:get_health, _from, state) do
    {:reply, state.health, state}
  end

  def handle_info(:tick, state) do
    new_state = process(state)
    dispatch(new_state)
    {:noreply, new_state}
  end

  def handle_cast({:damage, _, _, _} = event, state) do
    new_state =
      state
      |> Map.update(:damage_events, [], fn(damage_events) ->
        [event | damage_events]
      end)

    {:noreply, new_state}
  end

  def process(%{state: :dead, respawn_ticks: 0} = state) do
    state
    |> Map.put(:state, :alive)
    |> Map.put(:health, @starting_health)
    |> Map.put(:respawn_ticks, @ticks_to_respawn)
    |> Map.put(:damage_events, [])
  end

  def process(%{state: :dead, respawn_ticks: respawn_ticks} = state) do
    state
    |> Map.put(:respawn_ticks, respawn_ticks - 1)
    |> Map.put(:damage_events, [])
  end

  def process(%{state: :alive, health: health} = state) when health <= 0 do
    broadcast(%{
      name: "SYSTEM",
      body: "#{state.user.name} died..",
      timestamp: timestamp_now()
    })

    state
    |> Map.put(:state, :dead)
    |> Map.put(:damage_events, [])
  end

  def process(state) do
    damage_events = state.damage_events
    random_target = IdleIsles.Sync.get_random_player()

    new_state =
      state
      |> Map.put(:damage_events, [])
      |> Map.update(:health, 100, fn(health) ->
        Enum.reduce(damage_events, health, fn({_, source_user, damage, damage_type}, acc_health) ->
          broadcast(%{
            name: "SYSTEM",
            body: "#{source_user.name} dealt #{damage} to #{state.user.name}",
            timestamp: timestamp_now()
          })

          acc_health - damage
        end)
      end)

    if new_state.health > 0 && random_target && random_target != self() do
      damage(random_target, state.user, :random.uniform(10), :normal)
    end

    new_state
  end

  defp dispatch(state) do
    topic = "user:#{state.user.id}"
    event = "tick"

    IdleIslesWeb.Endpoint.broadcast(topic, event, %{
      health: state.health,
      state: state.state,
    })
  end

  defp broadcast(message) do
    topic = "chat"
    event = "new:msg"

    IdleIslesWeb.Endpoint.broadcast(topic, event, message)
  end

  defp timestamp_now() do
    DateTime.utc_now
    |> DateTime.to_time()
    |> Time.to_iso8601()
  end
end
