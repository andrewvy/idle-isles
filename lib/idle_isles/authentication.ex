defmodule IdleIsles.Authentication do
  alias IdleIsles.Accounts

  @type error_code :: :not_found | :invalid_password

  @doc """
  Given a email and password, validates if an
  account exists + password is valid and then
  generates a valid JWT token.
  """
  @spec login(String.t, String.t) :: {:error, error_code} | {:ok, String.t}
  def login(email, password) do
    Accounts.get_user_by_email(email)
    |> case do
      nil -> {:error, :not_found}
      user ->
        if Argon2.verify_pass(password, user.password) do
          {:ok, user, generate_token(user)}
        else
          {:error, :invalid_password}
        end
    end
  end

  def generate_token(user) do
    %{"user_id" => user.id}
    |> Joken.token()
    |> Joken.with_signer(Joken.hs256("my_secret"))
    |> Joken.with_iat()
    |> Joken.with_exp()
    |> Joken.sign()
		|> Joken.get_compact()
  end

  def verify_token(token) do
    token_struct =
      token
      |> Joken.token()
      |> Joken.with_signer(Joken.hs256("my_secret"))
      |> Joken.verify()

    if valid_token?(token_struct) do
      {:ok, token_struct}
    else
      {:error, token_struct}
    end
  end

  def valid_token?(%Joken.Token{error: nil}), do: true
  def valid_token?(%Joken.Token{error: _}), do: false
end
