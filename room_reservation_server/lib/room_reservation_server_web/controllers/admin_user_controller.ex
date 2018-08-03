defmodule RoomReservationServerWeb.AdminUserController do
  use RoomReservationServerWeb, :controller

  alias RoomReservationServer.AdminUserContext
  alias RoomReservationServer.AdminUserContext.AdminUser
  alias RoomReservationServerWeb.Guardian
  use RoomReservationServer.AdminUserContext

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"admin_user" => user_params}) do
    user_changeset = AdminUser.changeset(%AdminUser{}, user_params)
    with {:ok, %AdminUser{} = user} <- save_create(user_changeset) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", admin_user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, user} <- get_by_id(AdminUser, id) do
      render(conn, "show.json", admin_user: user)
    end
  end

  def update(conn, %{"id" => id, "admin_user" => user_params}) do
    with {:ok, user} <- get_by_id(AdminUser, id) do
      user_changeset = AdminUser.changeset(user, user_params)
      with {:ok, %AdminUser{} = user} <- save_update(user_changeset) do
        render(conn, "show.json", admin_user: user)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, _} <- can_delete(conn, id), {:ok, %AdminUser{} = user} <- delete_by_id(AdminUser, id) do
      render(conn, "show.json", admin_user: user)
    end
  end

  # 当前登陆用户无法删除
  defp can_delete(conn, user_id) do
    claims = Guardian.Plug.current_claims(conn)
    id = claims["sub"]
    case id == user_id do
      true ->{:error, "can not delete yourself"}
      false ->{:ok, "can delete"}
    end
  end
end
