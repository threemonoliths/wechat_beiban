defmodule RoomReservationServerWeb.LoginController do
  
  use RoomReservationServerWeb, :controller   
  alias RoomReservationServerWeb.{Guardian}
  use Ecto.Schema

  use RoomReservationServer.Accounts

  alias RoomReservationServer.AdminUserContext.AdminUser
  alias RoomReservationServer.Repo
  alias RoomReservationServer.Accounts.User
  
    
  # 后台管理用户登录
  def login(conn, %{"password" => pw, "username" => m} = params) do
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

  # 手机端访问验证open_id，如果不存在则自动创建
  def auto_login(conn, %{"open_id" => open_id} = params) do
    case check_openid(open_id) do
      {:ok, user} ->
        {:ok, token, claims} = Guardian.encode_and_sign(user)
        IO.inspect %{user: get_wxuser_map(user), jwt: token}
        json conn, %{user: get_wxuser_map(user), jwt: token}
      {:error, _} ->
        conn
        |> put_status(200)
        |> json(%{error: "Create user failed!"})

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

  defp get_wxuser_map(user) do
    case user do
      nil -> nil
      user ->
        %{
          id: user.id,
          open_id: user.open_id
        }
    end
  end

  # 管理员用户名密码登陆验证
  defp checkPassword(username, password) do
    user = AdminUser
    |> Repo.get_by(%{ name: username })
    cond do
      !is_nil(user) && Comeonin.Pbkdf2.checkpw(password, user.password_hash) ->
        {:ok, user}
      true ->
        {:error, nil}
    end
  end

  # 微信用户验证
  defp check_openid(open_id) do
    user = User
    |> Repo.get_by(%{ open_id: open_id })
    cond do
      !is_nil(user) ->
        {:ok, user}
      true ->
        insert_by_open_id(open_id)
    end
  end
  
end
