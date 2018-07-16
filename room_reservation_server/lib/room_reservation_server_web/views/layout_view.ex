defmodule RoomReservationServerWeb.LayoutView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.LayoutView

  def render("index.json", %{layouts: layouts}) do
    %{data: render_many(layouts, LayoutView, "layout.json")}
  end

  def render("show.json", %{layout: layout}) do
    %{data: render_one(layout, LayoutView, "layout.json")}
  end

  def render("layout.json", %{layout: layout}) do
    %{id: layout.id,
      layout: layout.layout}
  end
end
