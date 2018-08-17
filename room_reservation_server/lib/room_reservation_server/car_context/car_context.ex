defmodule RoomReservationServer.CarContext do
  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.CarContext.Car

  use RoomReservationServer.BaseContext
  
    defmacro __using__(_opts) do
      quote do
        import RoomReservationServer.CarContext
        use RoomReservationServer.BaseContext
        alias RoomReservationServer.CarContext.Car
      end
    end
  
    def page(params) do 
      Car
      |> query_like(params, "no")
      |> query_order_by(params, "no")
      |> get_pagination(params)
    end
end
