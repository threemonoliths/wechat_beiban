defmodule RoomReservationServer.LayoutContext do
  @moduledoc """
  The LayoutContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.LayoutContext.Layout

  use RoomReservationServer.BaseContext
  
    defmacro __using__(_opts) do
      quote do
        import RoomReservationServer.LayoutContext
        use RoomReservationServer.BaseContext
        alias RoomReservationServer.LayoutContext.Layout
      end
    end
  
    def page(params) do 
      Layout
      |> query_like(params, "layout")
      |> get_pagination(params)
    end
end
