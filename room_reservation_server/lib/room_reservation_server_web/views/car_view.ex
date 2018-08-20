defmodule RoomReservationServerWeb.CarView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.CarView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, CarView, "car.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{car: car}) do
    %{data: render_one(car, CarView, "car.json")}
  end

  def render("car.json", %{car: car}) do
    %{id: car.id,
      no: car.no,
      kind: car.kind,
      pic: car.pic,
      price: car.price,
      buydate: car.buydate,
      orderdate: car.orderdate,
      usedate: car.usedate,
      state: car.state}
  end
end
