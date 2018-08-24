defmodule RoomReservationServerWeb.RoomOrderInfoView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.RoomOrderInfoView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, RoomOrderInfoView, "room_order_info.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{room_order_info: room_order_info}) do
    %{data: render_one(room_order_info, RoomOrderInfoView, "room_order_info.json")}
  end

  def render("room_order_info.json", %{room_order_info: room_order_info}) do
    IO.puts("in view######################")
    IO.puts inspect room_order_info
    %{
      id: room_order_info.id,
      start_time: room_order_info.start_time,
      days: room_order_info.days,
      rooms: room_order_info.rooms,
      status: room_order_info.status,    
      comment: room_order_info.comment,    
      layout: %{id: room_order_info.layout.id, layout: room_order_info.layout.layout},
      user: %{id: room_order_info.user.id, open_id: room_order_info.user.open_id, name: room_order_info.user.name}

    }
  end
end
