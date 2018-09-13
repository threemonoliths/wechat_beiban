defmodule RoomReservationServer.CarOrderContext do
  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.CarOrderContext.CarOrder


  use RoomReservationServer.BaseContext
  
  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.CarOrderContext
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.CarOrderContext.CarOrder
    end
  end

  def page(params) do 
    CarOrder
    |> query_like(params, "carNo")
    |> query_like(params, "phone")
    |> query_equal(params, "state")
    |> query_order_by(params, "inserted_at")
    |> get_pagination(params)
  end
  
end