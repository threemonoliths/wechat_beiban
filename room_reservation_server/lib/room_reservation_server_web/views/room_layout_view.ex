defmodule RoomReservationServerWeb.RoomLayoutView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.RoomLayoutView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, RoomLayoutView, "room_layout.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{room_layout: layout}) do
    %{data: render_one(layout, RoomLayoutView, "room_layout.json")}
  end

  def render("room_layout.json", %{room_layout: layout}) do
    %{
      id: layout.id,
      layout: layout.layout,
      price_01: layout.price_01,
      price_02: layout.price_02,
      book_price: layout.book_price,
      breakfast: layout.breakfast,
      desc: layout.desc,
      image_url: getPicUrl(layout)
    }
  end

  # 获图片url
  defp getPicUrl(layout) do
    case layout.layout_pic do
      nil -> ""
      layout_pic -> 
        url = RoomReservationServerWeb.StringHandler.take_prefix(RoomReservationServer.LayoutPic.url({layout.layout_pic, layout}, :original),"/priv/static")  
        base = Application.get_env(:room_reservation_server, RoomReservationServerWeb.Endpoint)[:baseurl]
        base<>url
    end
  end

end
