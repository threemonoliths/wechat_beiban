defmodule RoomReservationServerWeb.LayoutView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.LayoutView

  def render("index.json", %{page: page}) do
    IO.puts("in index.json###########")
    %{
      data: render_many(page.entries, LayoutView, "layout.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{layout: layout}) do
    IO.puts("in show.json###########")
    %{data: render_one(layout, LayoutView, "layout.json")}
  end

  def render("layout.json", %{layout: layout}) do
    %{
      id: layout.id,
    #   type: dict.type,
    #   key: dict.key,
    #   value: dict.value
    }
  end


  # def render("layout.json", %{layout: layout}) do
  #   IO.puts("in layout.json###########")
  #   %{
  #     id: layout.id,
      # layout: layout.layout,
      # price_01: layout.price_01,
      # price_02: layout.price_02,
      # book_price: layout.book_price,
      # breakfast: layout.breakfast,
      # desc: layout.desc,
      # url: ""
    # }
  # end
end
