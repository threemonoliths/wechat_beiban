defmodule RoomReservationServerWeb.RoomView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.RoomView

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, RoomView, "room.json")}
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id,
      room_number: room.room_number}
  end
end
