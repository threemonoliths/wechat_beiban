defmodule RoomReservationServerWeb.RoomController do
  use RoomReservationServerWeb, :controller

  alias RoomReservationServer.RoomContext
  alias RoomReservationServer.RoomContext.Room

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, _params) do
    rooms = RoomContext.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, %{"room" => room_params}) do
    with {:ok, %Room{} = room} <- RoomContext.create_room(room_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", room_path(conn, :show, room))
      |> render("show.json", room: room)
    end
  end

  def show(conn, %{"id" => id}) do
    room = RoomContext.get_room!(id)
    render(conn, "show.json", room: room)
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = RoomContext.get_room!(id)

    with {:ok, %Room{} = room} <- RoomContext.update_room(room, room_params) do
      render(conn, "show.json", room: room)
    end
  end

  def delete(conn, %{"id" => id}) do
    room = RoomContext.get_room!(id)
    with {:ok, %Room{}} <- RoomContext.delete_room(room) do
      send_resp(conn, :no_content, "")
    end
  end
end
