defmodule RoomReservationServer.RoomLayoutContext do
  @moduledoc """
  The LayoutContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.RoomLayoutContext.RoomLayout

  use RoomReservationServer.BaseContext
  
    defmacro __using__(_opts) do
      quote do
        import RoomReservationServer.RoomLayoutContext
        use RoomReservationServer.BaseContext
        alias RoomReservationServer.RoomLayoutContext.RoomLayout
      end
    end
  
    def page(params) do 
      RoomLayout
      |> query_like(params, "layout")
      |> query_order_by(params, "layout")
      |> get_pagination(params)
    end
end
