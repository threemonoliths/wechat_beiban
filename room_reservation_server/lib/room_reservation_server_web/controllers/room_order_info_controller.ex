defmodule RoomReservationServerWeb.RoomOrderInfoController do
  use RoomReservationServerWeb, :controller

  alias RoomReservationServer.RoomOrderInfoContext
  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, _params) do
    room_order_info = RoomOrderInfoContext.list_room_order_info()
    render(conn, "index.json", room_order_info: room_order_info)
  end

  def create(conn, %{"room_order_info" => room_order_info_params}) do
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
end
