defmodule RoomReservationServerWeb.RoomOrderInfoView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.RoomOrderInfoView

  def render("index.json", %{room_order_info: room_order_info}) do
    %{data: render_many(room_order_info, RoomOrderInfoView, "room_order_info.json")}
  end

  def render("show.json", %{room_order_info: room_order_info}) do
    %{data: render_one(room_order_info, RoomOrderInfoView, "room_order_info.json")}
  end

  def render("room_order_info.json", %{room_order_info: room_order_info}) do
    %{id: room_order_info.id,
      room_id: room_order_info.room_id}
  end
end
