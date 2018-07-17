defmodule RoomReservationServerWeb.DictView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.DictView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, DictView, "dict.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{dict: dict}) do
    %{data: render_one(dict, DictView, "dict.json")}
  end

  def render("dict.json", %{dict: dict}) do
    %{
      id: dict.id,
      type: dict.type,
      key: dict.key,
      value: dict.value
    }
  end
end
