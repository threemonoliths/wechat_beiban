defmodule RoomReservationServerWeb.RoomOrderInfoController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.RoomOrderInfoContext
  alias RoomReservationServer.Accounts.User
  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo 
  alias RoomReservationServer.RoomLayoutContext.RoomLayout

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"room_order_info" => room_order_info_params}) do
    user_changeset = get_user_changeset(room_order_info_params)
    layout_changeset = get_layout_changeset(room_order_info_params)
    info_changeset = RoomOrderInfo.changeset(%RoomOrderInfo{}, room_order_info_params)
    |> Ecto.Changeset.put_assoc(:user, user_changeset)
    |> Ecto.Changeset.put_assoc(:layout, layout_changeset)
    with {:ok, %RoomOrderInfo{} = room_order_info} <- save_create(info_changeset) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", room_order_info_path(conn, :show, room_order_info))
      |> render("show.json", room_order_info: room_order_info)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, room_order_info} <- get_by_id(RoomOrderInfo, id,[:layout, :user]) do
      render(conn, "show.json", room_order_info: room_order_info)
    end
  end

  def update(conn, %{"id" => id, "room_order_info" => room_order_info_params}) do
    {:ok, room_order_info} = get_by_id(RoomOrderInfo, id, [:layout, :user])
    user_changeset = get_user_changeset(room_order_info_params)
    layout_changeset = get_layout_changeset(room_order_info_params)
    info_changeset = RoomOrderInfo.changeset(room_order_info, room_order_info_params)
    if !is_nil(user_changeset) do
      info_changeset = info_changeset |> Ecto.Changeset.put_assoc(:user, user_changeset)
    end
    if !is_nil(layout_changeset) do
      info_changeset = info_changeset |> Ecto.Changeset.put_assoc(:layout, layout_changeset)
    end
    with {:ok, %RoomOrderInfo{} = room_order_info} <- save_update(info_changeset) do
      render(conn, "show.json", room_order_info: room_order_info)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %RoomOrderInfo{} = layout} <- delete_by_id(RoomOrderInfo, id, [:layout, :user]) do
      render(conn, "show.json", room_order_info: layout)
    end
  end

  defp get_user_changeset(params) do
    params
    |> Map.get("user", %{})
    |> Map.get("open_id")
    |> case do
      nil -> nil
      open_id ->
        case get_by_name(User, open_id: open_id) do
          {:error, _} -> nil
          {:ok, user} -> change(User, user)
        end
    end
  end

  defp get_layout_changeset(params) do
    params
    |> Map.get("room_layout", %{})
    |> Map.get("id")
    |> case do
      nil -> nil
      id ->
        case get_by_id(RoomLayout, id) do
          {:error, _} -> nil
          {:ok, layout} -> change(RoomLayout, layout)
        end
    end
  end
end
