defmodule IdleIslesWeb.Resolvers.UserResolver do
  def resolve(_, %{context: %{current_user: nil}}) do
    {:error, "Not logged in"}
  end

  def resolve(_, %{context: %{current_user: current_user}}) do
    {:ok, Map.take(current_user, [:id, :name, :email])}
  end
end
