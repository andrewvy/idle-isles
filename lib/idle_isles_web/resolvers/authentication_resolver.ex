defmodule IdleIslesWeb.Resolvers.AuthenticationResolver do
  alias IdleIsles.{Accounts, Authentication}

  def register(%{email: _, password: _, name: _} = attrs, %{context: %{current_user: nil}}) do
    case Accounts.register(attrs) do
      {:error, changeset} -> IdleIslesWeb.Schema.format_changeset(changeset)
      {:ok, user} -> {:ok, %{user: transform_user(user)}}
    end
  end

  def register(_attrs, %{context: %{current_user: _}}) do
    {:error, "Already logged in!"}
  end

  def login(%{email: email, password: password}, %{context: %{current_user: nil}}) do
    case Authentication.login(email, password) do
      {:error, _} -> {:error, "Wrong email or password"}
      {:ok, user, token} ->
        {:ok, %{
          user: transform_user(user),
          token: token
        }}
    end
  end

  def login(_, %{context: %{current_user: _}}) do
    {:error, "Already logged in!"}
  end

  def transform_user(user) do
    Map.take(user, [:id, :name, :email])
  end
end
