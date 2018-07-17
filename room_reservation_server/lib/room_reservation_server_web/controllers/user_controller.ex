defmodule RoomReservationServerWeb.UserController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.Accounts
  alias RoomReservationServer.Accounts
  alias RoomReservationServer.Accounts.User

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"user" => user_params}) do
    user_changeset = User.changeset(%User{}, user_params)
    with {:ok, %User{} = user} <- save_create(user_changeset) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, user} <- get_by_id(User, id) do
      render(conn, "show.json", user: user)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    with {:ok, user} <- get_by_id(User, id) do
      user_changeset = User.changeset(user, user_params)
      with {:ok, %User{} = user} <- save_update(user_changeset) do
        render(conn, "show.json", user: user)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %User{} = user} <- delete_by_id(User, id) do
      render(conn, "show.json", user: user)
    end
  end
end
