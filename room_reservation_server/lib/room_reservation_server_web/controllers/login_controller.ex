defmodule RoomReservationServerWeb.LoginController do
  
  use RoomReservationServerWeb, :controller   
  alias RoomReservationServerWeb.{Guardian}
  use Ecto.Schema

  alias RoomReservationServer.AdminUserContext.AdminUser
  alias RoomReservationServer.Repo
    
  # 后台管理用户登录
  def login(conn, %{"password" => pw, "userName" => m} = params) do
    case checkPassword(m, pw) do
      {:ok, user} ->
        {:ok, token, claims} = Guardian.encode_and_sign(user)
        json conn, %{user: get_user_map(user), jwt: token}
      {:error, _} ->
        conn
        |> put_status(200)
        |> json(%{error: "Invalid mobile or password!"})
    end
  end

  defp get_user_map(user) do
    case user do
      nil -> nil
      user ->
        %{
          id: user.id,
          name: user.name
        }
    end
  end

  # 用户名密码登陆验证
  defp checkPassword(username, password) do
    IO.puts inspect password
    user = AdminUser
    |> Repo.get_by(%{ name: username })
    cond do
      !is_nil(user) && Comeonin.Pbkdf2.checkpw(password, user.password_hash) ->
        {:ok, user}
      true ->
        {:error, nil}
    end
  end
  
end
