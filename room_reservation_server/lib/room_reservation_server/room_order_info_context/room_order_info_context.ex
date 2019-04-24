defmodule RoomReservationServer.RoomOrderInfoContext do
  @moduledoc """
  The RoomOrderInfoContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo
  alias RoomReservationServer.Accounts.User

  use RoomReservationServer.BaseContext
  
  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.RoomOrderInfoContext
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo
    end
  end

  # 手机端调用时会传递open_id的值，此时执行这个page函数
  def page(%{"openid" => open_id} = params) do
    {:ok, user} = User
    |> get_by_name(open_id: open_id)
    IO.puts inspect "user is (roomlayoutorder!!!!!):"
    IO.puts inspect user
    RoomOrderInfo
    |> query_equal(%{"user_id" => user.id}, "user_id")
    |> query_equal(params, "status")
    |> query_preload([:layout, :user])
    |> get_pagination(params)
  end

  def page(params) do 
    RoomOrderInfo
    |> query_equal(params, "layout_id")
    |> query_equal(params, "user_id")
    |> query_equal(params, "status")
    |> query_like(params, "phone")
    |> query_order_by(params, "inserted_at")
    |> query_preload([:layout, :user])
    |> get_pagination(params)
  end
  
end
