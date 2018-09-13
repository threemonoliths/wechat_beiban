defmodule RoomReservationServerWeb.CarOrderView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.CarOrderView
  alias RoomReservationServerWeb.Utils.DateHandler

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, CarOrderView, "car_order.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{car_order: car_order}) do
    %{data: render_one(car_order, CarOrderView, "car_order.json")}
  end

  def render("car_order.json", %{car_order: car_order}) do
    %{id: car_order.id,
      occupant: car_order.occupant,
      phone: car_order.phone,
      orderNo: car_order.orderNo,
      orderDate: car_order.orderDate,
      kind: car_order.kind,
      carNo: car_order.carNo,
      userNo: car_order.userNo,
      inserted_at: car_order.inserted_at |> DateHandler.get_date_str,
      state: car_order.state}
  end
end
