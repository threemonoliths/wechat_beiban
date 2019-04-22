defmodule RoomReservationServer.CarOrderContext do
  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.CarOrderContext.CarOrder
  alias RoomReservationServer.Accounts.User


  use RoomReservationServer.BaseContext
  
  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.CarOrderContext
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.CarOrderContext.CarOrder
    end
  end

   # 手机端调用时会传递open_id的值，此时执行这个page函数
   def page(%{"open_id" => open_id} = params) do
    user = User
    |> get_by_name(open_id: open_id)
    RoomOrderInfo
    |> query_equal(%{user_id: user.id}, "user_id")
    |> query_preload([:user])
    |> get_pagination(params)
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