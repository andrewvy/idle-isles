defmodule IdleIslesWeb.Resolvers.AuthenticationResolver do
  alias IdleIsles.Authentication

  def login(%{email: email, password: password}, %{context: %{current_user: nil}}) do
    case Authentication.login(email, password) do
      {:error, _} -> {:error, "Wrong email or password"}
      {:ok, token} ->
        {:ok, %{
          token: token
        }}
    end
  end

  def login(_, %{context: %{current_user: _}}) do
    {:error, "Already logged in!"}
  end
end
