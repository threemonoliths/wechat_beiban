defmodule RoomReservationServerWeb.PageController do
  use RoomReservationServerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
