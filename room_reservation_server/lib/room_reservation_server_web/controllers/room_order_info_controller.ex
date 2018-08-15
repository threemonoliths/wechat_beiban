defmodule RoomReservationServerWeb.RoomOrderInfoController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.RoomOrderInfoContext
  alias RoomReservationServer.Accounts.User
  alias RoomReservationServer.RoomLayoutContext.RoomLayout

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, _params) do
    room_order_info = RoomOrderInfoContext.list_room_order_info()
    render(conn, "index.json", room_order_info: room_order_info)
  end

  def create(conn, %{"room_order_info" => room_order_info_params}) do
    user_changeset = get_user_changeset(room_order_info_params)
    layout_changeset = get_layout_changeset(room_order_info_params)
    with {:ok, %RoomOrderInfo{} = room_order_info} <- RoomOrderInfoContext.create_room_order_info(room_order_info_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", room_order_info_path(conn, :show, room_order_info))
      |> render("show.json", room_order_info: room_order_info)
    end
  end

  def show(conn, %{"id" => id}) do
    room_order_info = RoomOrderInfoContext.get_room_order_info!(id)
    render(conn, "show.json", room_order_info: room_order_info)
  end

  def update(conn, %{"id" => id, "room_order_info" => room_order_info_params}) do
    room_order_info = RoomOrderInfoContext.get_room_order_info!(id)

    with {:ok, %RoomOrderInfo{} = room_order_info} <- RoomOrderInfoContext.update_room_order_info(room_order_info, room_order_info_params) do
      render(conn, "show.json", room_order_info: room_order_info)
    end
  end

  def delete(conn, %{"id" => id}) do
    room_order_info = RoomOrderInfoContext.get_room_order_info!(id)
    with {:ok, %RoomOrderInfo{}} <- RoomOrderInfoContext.delete_room_order_info(room_order_info) do
      send_resp(conn, :no_content, "")
    end
  end

  defp get_user_changeset(params) do
    params
    |> Map.get("user", %{})
    |> Map.get("id")
    |> case do
      nil -> nil
      id ->
        case get_by_id(User, id) do
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
          {:ok, layout} -> change(User, layout)
        end
    end
  end
end
