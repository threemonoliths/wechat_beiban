defmodule RoomReservationServerWeb.DictView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.DictView

  def render("index.json", %{dicts: dicts}) do
    %{data: render_many(dicts, DictView, "dict.json")}
  end

  def render("show.json", %{dict: dict}) do
    %{data: render_one(dict, DictView, "dict.json")}
  end

  def render("dict.json", %{dict: dict}) do
    %{id: dict.id,
      type: dict.type}
  end
end
