defmodule RoomReservationServer.RoomOrderInfoContext do
  @moduledoc """
  The RoomOrderInfoContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo

  use RoomReservationServer.BaseContext
  
  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.RoomOrderInfoContext
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo
    end
  end

  def page(params) do 
    RoomLayout
    |> query_equal(params, "layout_id")
    |> query_equal(params, "user_id")
    # |> query_order_by(params, "inserted_at")
    |> get_pagination(params)
  end
  
end
