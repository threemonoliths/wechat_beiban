defmodule RoomReservationServer.Accounts do
  @moduledoc """
  The User context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.Accounts.User
  use RoomReservationServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.Accounts
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.Accounts.User
    end
  end

  def page(params) do 
    User
    |> query_like(params, "name")
    |> query_like(params, "mobile")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end

  # 根据open_id判断用户是否存在
  def get_by_open_id(open_id) do
    case get_by_name(User, open_id: open_id) do
      {:ok, user} ->
        user
      {_, _} ->
        nil
    end
  end

  # 根据open_id创建新用户
  def insert_by_open_id(open_id) do
    case get_by_open_id(open_id) do
      nil ->
        %User{}
        |> User.changeset(%{open_id: open_id})
        |> Repo.insert()
      _ ->
        {:error, "already exist"}
    end
  end
end
