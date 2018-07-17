defmodule RoomReservationServer.Accounts do
  @moduledoc """
  The User context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.Accounts.User
  use RoomReservationServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.Accounts
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.Accounts.User
    end
  end

  def page(params) do 
    User
    |> query_like(params, "name")
    |> query_like(params, "mobile")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end
end
