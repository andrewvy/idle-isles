defmodule IdleIslesWeb.Schema do
  use Absinthe.Schema

  alias IdleIslesWeb.Resolvers

  query do
    field :me, :user do
      resolve &Resolvers.UserResolver.resolve/2
    end
  end

  mutation do
    field :login, type: :login_response do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Resolvers.AuthenticationResolver.login/2
    end

    field :register, type: :register_response do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      arg :name, non_null(:string)

      resolve &Resolvers.AuthenticationResolver.register/2
    end
  end

  object :user do
    field :id, :id
    field :name, :string
    field :email, :string
  end

  object :login_response do
    field :token, :string
  end

  object :register_response do
    field :user, :user
  end
end
